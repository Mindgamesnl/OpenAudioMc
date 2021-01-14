package com.craftmend.openaudiomc.generic.networking;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.handlers.*;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.health.RelayHealthCheck;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.io.SocketIoConnector;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientCreateMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.speakers.PacketClientCreateSpeaker;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.player.ProxiedPlayerAdapter;
import com.craftmend.openaudiomc.generic.player.SpigotPlayerAdapter;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.craftmend.openaudiomc.velocity.generic.player.VelocityPlayerAdapter;
import lombok.Getter;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.*;

public class DefaultNetworkingService extends NetworkingService {

    @Getter
    private final Set<INetworkingEvents> eventHandlers = new HashSet<>();
    private final Map<UUID, ClientConnection> clientMap = new HashMap<>();
    private final Map<PacketChannel, PayloadHandler<?>> packetHandlerMap = new HashMap<>();
    private SocketIoConnector socketIoConnector;

    /**
     * setup the plugin connection
     */
    public DefaultNetworkingService() {
        // register socket handlers
        registerHandler(PacketChannel.SOCKET_IN_REGISTER_CLIENT, new ClientConnectHandler());
        registerHandler(PacketChannel.SOCKET_IN_UNREGISTER_CLIENT, new ClientDisconnectHandler());

        // register UI handlers
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_ENABLED_HUE, new ClientLinkedHueHandler());
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_FAILED_MEDIA, new ClientMediaErrorHandler());
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_UPDATE_CHANNELS, new ClientChannelUpdateHandler());
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_CHANGED_VOLUME, new ClientChangedVolumeHandler());
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_INITIALIZED_RTC, new ClientInitializedRtcHandler());

        init();

        // middleware
        addEventHandler(new INetworkingEvents() {
            @Override
            public void onPacketSend(Authenticatable target, AbstractPacket packet) {
                if (target instanceof ClientConnection && (
                        packet instanceof PacketClientCreateMedia || packet instanceof PacketClientCreateSpeaker
                )) {
                    ClientConnection client = (ClientConnection) target;
                    client.getMixTracker().triggerExpectedTrack();
                }
            }
        });
    }

    private void init() {
        try {
            socketIoConnector = new SocketIoConnector(OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet());
        } catch (Exception e) {
            OpenAudioLogger.toConsole("The plugin could not start because of a connection problem when requesting the initial private key. Please contact the developers of this plugin.");
            e.printStackTrace();
        }

        // schedule health check
        int timeout = 20 * 10;
        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(new RelayHealthCheck(), timeout, timeout);
    }

    /**
     * try to connect to the api, if it is not already connected
     */
    @Override
    public void connectIfDown() {
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> socketIoConnector.setupConnection());
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
            OpenAudioLogger.toConsole("Unknown handler for packet type " + abstractPacket.getPacketChannel().name());
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
    private void registerHandler(PacketChannel type, PayloadHandler<?> handler) {
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
            switch (OpenAudioMc.getInstance().getPlatform()){
                case SPIGOT:
                    Player player = Bukkit.getPlayer(uuid);
                    if (player == null) return null;
                    return register(player);
                case BUNGEE:
                    ProxiedPlayer proxiedPlayer = ProxyServer.getInstance().getPlayer(uuid);
                    if (proxiedPlayer == null) {
                        // if the player is null or not on this server, it might be a case of redis bungee
                        return null;
                    }
                    return register(proxiedPlayer);
                case VELOCITY:
                    Optional<com.velocitypowered.api.proxy.Player> velocityPlayer = OpenAudioMcVelocity.getInstance().getServer().getPlayer(uuid);
                    return velocityPlayer.map(this::register).orElse(null);
                default:
                    return null;
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
            removedConnectionSubscribers.forEach((id, handler) -> handler.accept(client));

            // are we in stand alone mode? then kick this client
            if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
                if (OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.STAND_ALONE) client.kick();
            } else {
                client.kick();
            }

            client.onDestroy();
            clientMap.remove(player);
        }
    }

    @Override
    public ClientConnection register(Player player) {
        ClientConnection clientConnection = new ClientConnection(new SpigotPlayerAdapter(player));
        clientMap.put(player.getUniqueId(), clientConnection);
        createdConnectionSubscribers.forEach((id, handler) -> handler.accept(clientConnection));
        return clientConnection;
    }

    @Override
    public ClientConnection register(ProxiedPlayer player) {
        ClientConnection clientConnection = new ClientConnection(new ProxiedPlayerAdapter(player));
        clientMap.put(player.getUniqueId(), clientConnection);
        createdConnectionSubscribers.forEach((id, handler) -> handler.accept(clientConnection));
        return clientConnection;
    }

    @Override
    public ClientConnection register(com.velocitypowered.api.proxy.Player player) {
        ClientConnection clientConnection = new ClientConnection(new VelocityPlayerAdapter(player));
        clientMap.put(player.getUniqueId(), clientConnection);
        createdConnectionSubscribers.forEach((id, handler) -> handler.accept(clientConnection));
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
    public Set<INetworkingEvents> getEvents() {
        return eventHandlers;
    }

    @Override
    public void addEventHandler(INetworkingEvents events) {
        eventHandlers.add(events);
    }
}
