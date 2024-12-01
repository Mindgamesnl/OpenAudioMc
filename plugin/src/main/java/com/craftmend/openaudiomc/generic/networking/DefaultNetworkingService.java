package com.craftmend.openaudiomc.generic.networking;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.VoiceApi;
import com.craftmend.openaudiomc.api.events.client.ClientAuthenticationEvent;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.client.helpers.SerializableClient;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.queue.PacketQueue;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.mojang.MojangLookupService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.handlers.*;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.io.SocketConnection;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.states.ReconnectingState;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import lombok.Getter;
import org.jetbrains.annotations.Nullable;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class DefaultNetworkingService extends NetworkingService {

    @Getter
    private final Set<INetworkingEvents> eventHandlers = new HashSet<>();
    private final Map<UUID, ClientConnection> clientMap = new ConcurrentHashMap<>();
    private final Map<PacketChannel, PayloadHandler<?>> packetHandlerMap = new HashMap<>();
    private final PacketQueue packetQueue = new PacketQueue();
    private SocketConnection socketConnection;
    private int packetThroughput = 0;
    private Lock connectLock = new ReentrantLock();

    public DefaultNetworkingService() {
        this.onModuleLoad();
    }

    /**
     * setup the plugin connection
     */
    @Override
    public void onModuleLoad() {
        // register socket handlers
        registerHandler(PacketChannel.SOCKET_IN_REGISTER_CLIENT, new ClientConnectHandler());
        registerHandler(PacketChannel.SOCKET_IN_UNREGISTER_CLIENT, new ClientDisconnectHandler());

        // register UI handlers
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_ENABLED_HUE, new ClientLinkedHueHandler());
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_FAILED_MEDIA, new ClientMediaErrorHandler());
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_UPDATE_CHANNELS, new ClientChannelUpdateHandler());
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_CHANGED_VOLUME, new ClientChangedVolumeHandler());
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_INITIALIZED_RTC, new ClientInitializedRtcHandler());
        registerHandler(PacketChannel.SOCKET_IN_CLIENT_CHANNEL_UI, new ClientVoiceChanelInteractionHandler());

        init();

        // default auth check middleware
        EventApi.getInstance().registerHandler(ClientAuthenticationEvent.class, event -> {
            // get Client from event
            ClientConnection client = getClient(event.getActor().getUniqueId());
            if (client == null) {
                event.setCancelled(true);
                return;
            }

            // check if the client is already connected
            if (client.isConnected()) {
                event.setCancelled(true);
                return;
            }

            // check if the token is correct
            if (!client.getAuth().isKeyCorrect(event.getToken())) {
                event.setCancelled(true);
            }
        });

        OpenAudioMc.resolveDependency(TaskService.class).scheduleAsyncRepeatingTask(() -> {
            packetThroughput = 0;
        }, 20, 20);
    }

    private void init() {
        OpenAudioLogger.info("Initializing connection service...");

        // set tick tack
        OpenAudioMc.resolveDependency(TaskService.class)
                .scheduleSyncRepeatingTask(() -> clientMap
                                .values()
                                .forEach(clientConnection -> clientConnection.getSession().tick()),
                        20, 20);

        try {
            socketConnection = new SocketConnection(getService(AuthenticationService.class).getServerKeySet(), this);
        } catch (Exception e) {
            OpenAudioLogger.error(e, "The plugin was unable to start because of a connection problem when requesting the initial private key. Please contact support in https://discord.openaudiomc.net/");
        }
    }

    /**
     * try to connect to the api, if it is not already connected
     */
    @Override
    public void connectIfDown() {
        try {
            if (!connectLock.tryLock(30, TimeUnit.SECONDS))
                return;

            if (!OpenAudioMc.getService(StateService.class).getCurrentState().canConnect()) {
                // health check for voice
                OpenAudioMc.getService(OpenaudioAccountService.class).startVoiceHandshake();
                return;
            }
            // update state
            OpenAudioMc.getService(OpenaudioAccountService.class).startVoiceHandshake();
            socketConnection.setupConnection();
        } catch (InterruptedException e) {
            // ignore - its okay
        } finally {
            connectLock.unlock();
        }
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

        // are we in a compromised state?
        if (getService(StateService.class).getCurrentState() instanceof ReconnectingState) {
            // is this packet important?
            if (packet.isQueueableIfReconnecting()) {
                // we need to queue it
                packetQueue.addPacket(client.getOwner().getUniqueId(), packet);
                return;
            } else {
                // drop this packet
                return;
            }
        }

        socketConnection.send(client, packet);
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
            OpenAudioLogger.warn("Unknown handler for packet type " + abstractPacket.getPacketChannel().name());
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
        } else if (MagicValue.DYNAMIC_REGISTRATIONS.get(Boolean.class)) {
            User oap = getService(UserHooks.class).byUuid(uuid);
            if (oap == null) return null;
            return register(oap, null);
        }
        return null;
    }

    @Override
    public boolean hasClient(UUID uuid) {
        return clientMap.containsKey(uuid);
    }

    /**
     * @return a collection of all clients
     */
    @Override
    public Collection<ClientConnection> getClients() {
        return clientMap.values();
    }

    @Override
    public int getThroughputPerSecond() {
        return packetThroughput;
    }

    @Override
    public boolean isReal() {
        return true;
    }

    /**
     * @param playerId the player to unregister
     */
    @Override
    public void remove(UUID playerId) {
        OpenAudioMc.getService(AuthenticationService.class).getDriver().removePlayerFromCache(playerId);
        ClientConnection client = clientMap.get(playerId);
        if (client != null) {
            removedConnectionSubscribers.forEach((id, handler) -> {
                try {
                    handler.accept(client);
                } catch (Exception e) {
                    OpenAudioLogger.error(e, "Failed to handle destroy listener " + id + " for " + client.getOwner().getName());
                }
            });

            Runnable removeCallback = () -> {
                clientMap.remove(playerId);
            };

            // are we in stand alone mode? then kick this client
            if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
                if (OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == OAClientMode.STAND_ALONE)
                    client.kick(removeCallback);
            } else {
                client.kick(removeCallback);
            }

            client.onDestroy();
        }
    }

    @Override
    public ClientConnection register(User player, @Nullable SerializableClient importData) {
        // register the player async to cache later
        getService(MojangLookupService.class).save(player);

        ClientConnection clientConnection = new ClientConnection(player, importData);
        clientMap.put(player.getUniqueId(), clientConnection);
        createdConnectionSubscribers.forEach((id, handler) -> handler.accept(clientConnection));

        return clientConnection;
    }

    /**
     * close the socket by force, because you are a strong and independent instance
     */
    @Override
    public void stop() {
        socketConnection.disconnect();
    }

    @Override
    public Set<INetworkingEvents> getEvents() {
        return eventHandlers;
    }

    @Override
    public void addEventHandler(INetworkingEvents events) {
        eventHandlers.add(events);
    }

    public void discardQueue() {
        this.packetQueue.clearAll();
    }

    public void flushQueue() {
        this.packetQueue.flush(this);
    }
}
