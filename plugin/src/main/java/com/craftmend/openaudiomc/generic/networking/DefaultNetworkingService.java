package com.craftmend.openaudiomc.generic.networking;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.handlers.ClientConnectHandler;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.handlers.ClientDisconnectHandler;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.io.SocketIoConnector;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.player.ProxiedPlayerAdapter;
import com.craftmend.openaudiomc.generic.player.SpigotPlayerAdapter;
import com.craftmend.openaudiomc.generic.voice.packets.subtypes.RoomMember;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.Getter;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.*;
import java.util.function.Consumer;

public class DefaultNetworkingService extends NetworkingService {

    @Getter private Set<INetworkingEvents> eventHandlers = new HashSet<>();
    private Map<UUID, ClientConnection> clientMap = new HashMap<>();
    private Map<PacketChannel, PayloadHandler<?>> packetHandlerMap = new HashMap<>();
    private SocketIoConnector socketIoConnector;

    /**
     * setup the plugin connection
     */
    public DefaultNetworkingService() {
        //register socket handlers
        registerHandler(PacketChannel.SOCKET_IN_REGISTER_CLIENT, new ClientConnectHandler());
        registerHandler(PacketChannel.SOCKET_IN_UNREGISTER_CLIENT, new ClientDisconnectHandler());

        try {
            socketIoConnector = new SocketIoConnector();
        } catch (Exception e) {
            OpenAudioLogger.toConsole("The plugin could not start because of a connection problem when requesting the initial private key. Please contact the developers of this plugin.");
            e.printStackTrace();
        }
    }

    /**
     * try to connect to the api, if it is not already connected
     */
    @Override
    public void connectIfDown() {
        socketIoConnector.setupConnection();
    }

    /**
     * send a packet to a client connection, if connected
     *
     * @param client the target
     * @param packet the data
     */
    @Override
    public void send(Authenticatable client, AbstractPacket packet) {
        for (INetworkingEvents event : getEvents()) event.onPacketSend(client, packet);
        socketIoConnector.send(client, packet);
    }

    /**
     * a packet got received, this function handles it on to the api for
     * parsing and processing in the plugin
     *
     * @param abstractPacket received
     */
    @Override
    public void triggerPacket(AbstractPacket abstractPacket) {
        if (packetHandlerMap.get(abstractPacket.getPacketChannel()) == null) {
            OpenAudioLogger.toConsole("Unknown handler for packet type " + abstractPacket.getClass().getName());
            return;
        }
        packetHandlerMap.get(abstractPacket.getPacketChannel()).trigger(abstractPacket);
    }

    /**
     * link a handler to a packet type
     *
     * @param type    channel id
     * @param handler handler
     */
    private void registerHandler(PacketChannel type, PayloadHandler handler) {
        packetHandlerMap.put(type, handler);
    }

    /**
     * @param uuid the uuid of a player
     * @return the client that corresponds to the player. can be null
     */
    @Override
    public ClientConnection getClient(UUID uuid) {
        if (clientMap.containsKey(uuid)) {
            return clientMap.get(uuid);
        } else {
            // if the platform is spigot, we should do the api check, we can skip it otherwise
            if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
                Player player = Bukkit.getPlayer(uuid);
                if (player == null) return null;
                return register(player);
            } else {
                ProxiedPlayer player = ProxyServer.getInstance().getPlayer(uuid);
                if (player == null) {
                    // if the player is null or not on this server, it might be a case of redis bungee
                    return null;
                }
                return register(player);
            }
        }
    }

    /**
     * @return a collection of all clients
     */
    @Override
    public Collection<ClientConnection> getClients() {
        return clientMap.values();
    }

    /**
     * @param player the player to unregister
     */
    @Override
    public void remove(UUID player) {
        if (clientMap.containsKey(player)) {
            ClientConnection client = clientMap.get(player);

            // are we in stand alone mode? then kick this client
            if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
                if (OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.STAND_ALONE) {
                    client.kick();
                    OpenAudioMc.getInstance().getVoiceRoomManager().removePlayer(client);
                }
            } else {
                client.kick();
                OpenAudioMc.getInstance().getVoiceRoomManager().removePlayer(client);
            }

            clientMap.remove(player);
        }
    }

    @Override
    public ClientConnection register(Player player) {
        ClientConnection clientConnection = new ClientConnection(new SpigotPlayerAdapter(player));
        clientMap.put(player.getUniqueId(), clientConnection);
        return clientConnection;
    }

    @Override
    public ClientConnection register(ProxiedPlayer player) {
        ClientConnection clientConnection = new ClientConnection(new ProxiedPlayerAdapter(player));
        clientMap.put(player.getUniqueId(), clientConnection);
        return clientConnection;
    }

    /**
     * close the socket by force, because you are a strong and independent instance
     */
    @Override
    public void stop() {
        socketIoConnector.disconnect();
    }

    @Override
    public void requestRoomCreation(List<RoomMember> members, Consumer<Boolean> wasSucessful) {
        this.socketIoConnector.createRoom(members, wasSucessful);
    }

    @Override
    public Set<INetworkingEvents> getEvents() {
        return eventHandlers;
    }

    @Override
    public void addEventHandler(INetworkingEvents events) {
        eventHandlers.add(events);
    }
}
