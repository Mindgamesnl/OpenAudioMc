package com.craftmend.openaudiomc.generic.networking;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.events.ClientPreAuthEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.helpers.SerializableClient;
import com.craftmend.openaudiomc.generic.mojang.MojangLookupService;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.handlers.*;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.io.SocketIoConnector;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.states.AssigningRelayState;
import com.craftmend.openaudiomc.generic.user.User;

import com.craftmend.openaudiomc.generic.voicechat.services.VoiceLicenseService;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import lombok.Getter;
import org.jetbrains.annotations.Nullable;

import java.util.*;

public class DefaultNetworkingService extends NetworkingService {

    @Getter
    private final Set<INetworkingEvents> eventHandlers = new HashSet<>();
    private final Map<UUID, ClientConnection> clientMap = new HashMap<>();
    private final Map<PacketChannel, PayloadHandler<?>> packetHandlerMap = new HashMap<>();
    private SocketIoConnector socketIoConnector;
    private int packetThroughput = 0;

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

        init();

        // default auth check middleware
        ApiEventDriver driver = AudioApi.getInstance().getEventDriver();
        if (driver.isSupported(ClientPreAuthEvent.class)) {
            AudioApi.getInstance().getEventDriver()
                    .on(ClientPreAuthEvent.class)
                    .setHandler((event -> {
                        // cancel the request if the client is already open, don't bother checking the token
                        if (event.getRequester().isConnected()) {
                            event.setCanceled(true);
                            return;
                        }

                        // cancel the login if the token is invalid
                        if (!event.getRequester().getAuth().isKeyCorrect(event.getToken())) {
                            event.setCanceled(true);
                        }
                    }));
        }

        OpenAudioMc.resolveDependency(TaskService.class).scheduleAsyncRepeatingTask(() -> {
            packetThroughput = 0;
        }, 20, 20);
    }

    private void init() {
        OpenAudioLogger.toConsole("Initializing socket connector");
        try {
            socketIoConnector = new SocketIoConnector(OpenAudioMc.getService(AuthenticationService.class).getServerKeySet());
        } catch (Exception e) {
            OpenAudioLogger.handleException(e);
            OpenAudioLogger.toConsole("The plugin could not start because of a connection problem when requesting the initial private key. Please contact the developers of this plugin.");
            e.printStackTrace();
        }
    }

    /**
     * try to connect to the api, if it is not already connected
     */
    @Override
    public void connectIfDown() {
        if (!OpenAudioMc.getService(StateService.class).getCurrentState().canConnect()) return;
        // update state
        OpenAudioMc.getService(StateService.class).setState(new AssigningRelayState());

        OpenAudioMc.getService(CraftmendService.class).startVoiceHandshake();
        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> socketIoConnector.setupConnection());
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
            User oap = getService(UserHooks.class).byUuid(uuid);
            if (oap == null) return null;
            return register(oap, null);
        }
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
                    e.printStackTrace();
                    OpenAudioLogger.toConsole("Failed to handle destroy listener " + id + " for " + client.getOwner().getName());
                }
            });

            Runnable removeCallback = () -> {
                clientMap.remove(playerId);
            };

            // are we in stand alone mode? then kick this client
            if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
                if (OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == OAClientMode.STAND_ALONE) client.kick(removeCallback);
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

        // schedule automatic license check, no worries though, this doesn't do anything if it isn't enabled
        getService(VoiceLicenseService.class).requestAutomaticLicense();

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
