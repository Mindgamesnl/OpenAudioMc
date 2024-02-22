package com.craftmend.openaudiomc.generic.voicechat.bus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.ClientEnableVoiceEvent;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.client.enums.RtcStateFlag;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientUnlockVoiceChat;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceChatUnlockPayload;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.response.NoResponse;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.states.ReconnectingState;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.voicechat.enums.VoiceApiStatus;
import com.craftmend.openaudiomc.generic.voicechat.enums.VoiceServerEventType;
import lombok.Getter;
import lombok.Setter;

import java.net.ConnectException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class VoiceApiConnection {

    private static final Map<String, String> EMPTY_PAYLOAD = new HashMap<>();
    @Setter @Getter private VoiceApiStatus status = VoiceApiStatus.IDLE;
    private VoiceSocket voiceSocket;
    private final TaskService taskService;

    @Getter private int maxSlots = 0;
    @Getter private String host = "none";
    private String lastToken = "";
    private int reconnectAttempts = 0;

    public VoiceApiConnection() {
        // setup tasks
        taskService = OpenAudioMc.resolveDependency(TaskService.class);

        taskService.scheduleAsyncRepeatingTask(() -> {
            if (status == VoiceApiStatus.CONNECTED) pushEvent(VoiceServerEventType.HEARTBEAT, EMPTY_PAYLOAD);
        }, 80, 80);

        // subscribe to player joins and leaves
        NetworkingService networkingService = OpenAudioMc.getService(NetworkingService.class);

        // only register if this is the default handler
        if (networkingService instanceof DefaultNetworkingService) {
            // client got created
            networkingService.subscribeToConnections(clientConnection -> {
                clientConnection.onConnect(() -> {
                    if (status != VoiceApiStatus.CONNECTED) return;
                    // is it allowed?
                    if (getUsedSlots() >= maxSlots) {
                        if (MagicValue.NOTIFY_VOICECHAT_SLOT_DEPLETION.get(Boolean.class)) {
                            clientConnection.getUser().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "VoiceChat couldn't be enabled since this server occupied all its slots, please notify a staff member and try again later.");
                        }
                        return;
                    }

                    // update state
                    if (clientConnection.getRtcSessionManager().getStateFlags().contains(RtcStateFlag.FORCE_MUTED)) {
                        forceMute(clientConnection);
                    }

                    // schedule async check
                    taskService.runAsync(() -> {
                        handleClientConnection(clientConnection);

                        // ignore voice if we're banned
                        if (clientConnection.getDataCache() == null && !StorageKey.SETTINGS_VC_ALLOW_JOIN_DURING_LOAD.getBoolean()) {
                            // error: still loading
                            clientConnection.getUser().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "We couldn't enable your voicechat as your profile is still loading, please try again in a few seconds or report this to a staff member if it keeps happening.");
                            return;
                        }

                        if (clientConnection.getDataCache() != null && clientConnection.getDataCache().getIsVoiceBlocked()) {
                            return;
                        }

                        // make an event, and invite the client if it isn't cancelled
                        ClientEnableVoiceEvent event = (ClientEnableVoiceEvent) EventApi.getInstance().callEvent(new ClientEnableVoiceEvent(clientConnection));
                        if (!event.isCancelled()) {
                            clientConnection.sendPacket(new PacketClientUnlockVoiceChat(new ClientVoiceChatUnlockPayload(
                                    clientConnection.getRtcSessionManager().getStreamKey(),
                                    this.host,
                                    StorageKey.SETTINGS_VC_RADIUS.getInt(),
                                    StorageKey.SETTINGS_VC_MOD_ENABLED.getBoolean()
                            )));
                        }
                    });
                });
            });

            networkingService.subscribeToDisconnections((clientConnection ->{
                // client will be removed
                OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> {
                    pushEvent(VoiceServerEventType.REMOVE_PLAYER, new HashMap<String, String>() {{
                        put("streamKey", clientConnection.getRtcSessionManager().getStreamKey());
                    }});
                });
            }));
        }
    }

    public void start(String server, String password, int slots) {
        // only connect when idle
        if (status != VoiceApiStatus.IDLE && status != VoiceApiStatus.RECONNECTING) return;
        boolean isReconnect = status == VoiceApiStatus.RECONNECTING;
        status = VoiceApiStatus.CONNECTING;
        lastToken = password;
        maxSlots = slots;
        host = server;
        taskService.runAsync(() -> {
            // setup link
            voiceSocket = new VoiceSocket(server, password, isReconnect);
            // setup hooks
            voiceSocket.onError(this::onWsClose);
            voiceSocket.onReady(this::onWsOpen);
            // start?
            try {
                boolean success = voiceSocket.start();
                if (success) {
                    OpenAudioLogger.info("Attempting to login to voice chat...");
                } else {
                    OpenAudioLogger.warn("Failed to initialize voice events.");
                    status = VoiceApiStatus.IDLE;
                }
            } catch (Exception e) {
                // is it a connect exception?
                if (e instanceof ConnectException) {
                    OpenAudioLogger.warn("Failed to connect to voice chat (ConnectException)");
                    onWsClose();
                } else {
                    OpenAudioLogger.error(e, "Failed to initialize voice events.");
                    onWsClose();
                }
            }
        });
    }

    public void stop() {
        if (voiceSocket == null) return;
        pushEvent(VoiceServerEventType.LOGOUT, new HashMap<>());
        this.voiceSocket.stop();
        this.onWsClose();
    }

    private void onWsClose() {
        if (!(status == VoiceApiStatus.CONNECTED || status == VoiceApiStatus.CONNECTING)) {
            return;
        }

        StateService stateService = OpenAudioMc.getService(StateService.class);
        boolean shouldAttemptReconnect = stateService.getCurrentState().isConnected() || stateService.getCurrentState() instanceof ReconnectingState;

        // or was it intentional?
        if (this.voiceSocket != null && this.voiceSocket.isAnnouncedShutdown()) {
            shouldAttemptReconnect = false;
        }

        if (reconnectAttempts >= 5) {
            OpenAudioLogger.warn("Failed to reconnect to voice chat 5 times, giving up.");
            status = VoiceApiStatus.IDLE;
            reconnectAttempts = 0;
            return;
        }

        if (shouldAttemptReconnect && !StorageKey.SETTINGS_AUTO_RECONNECT.getBoolean()) {
            shouldAttemptReconnect = false;
            OpenAudioLogger.warn("Voice chat connection lost, but auto reconnect is disabled.");
        }

        if (shouldAttemptReconnect) {
            reconnectAttempts++;
            OpenAudioLogger.warn("Voice chat connection lost, attempting to reconnect in 2 seconds... (attempt " + reconnectAttempts + "/5)");
            status = VoiceApiStatus.RECONNECTING;
            OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
                OpenAudioLogger.warn("Reconnecting to voice chat...");
                start(host, lastToken, maxSlots);
            }, 20 * 2);
            return;
        } else {
            reconnectAttempts = 0;
            pushEvent(VoiceServerEventType.LOGOUT, new HashMap<>());
            status = VoiceApiStatus.IDLE;
            // we disconnected! only fires once
            // logout, since we're not using this session anymore
            new RestRequest(NoResponse.class, Endpoint.VOICE_INVALIDATE_PASSWORD).run();
            for (ClientConnection client : OpenAudioMc.getService(NetworkingService.class).getClients()) {
                if (client.getRtcSessionManager().isReady()) {
                    client.getUser().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_UNSTABLE.getString()));
                    client.kick(() -> {
                        OpenAudioLogger.warn("Kicked " + client.getUser().getName() + " because the voicechat connection was lost");
                    });
                }
            }
        }
    }

    private void onWsOpen() {
        if (status == VoiceApiStatus.CONNECTED) return;
        Thread.currentThread().setName("OaVoiceWorker");
        OpenAudioLogger.info("Voice chat connected!");
        status = VoiceApiStatus.CONNECTED;
        reconnectAttempts = 0;
        // seed online players
        pushEvent(VoiceServerEventType.HEARTBEAT, EMPTY_PAYLOAD);
        pushEvent(VoiceServerEventType.HEARTBEAT, EMPTY_PAYLOAD);
        Collection<ClientConnection> clients = OpenAudioMc.getService(NetworkingService.class).getClients();
        for (ClientConnection client : clients) {
            if (client.isConnected()) {
                handleClientConnection(client);
            }
        }

        // is there no one online? then just close
        if (OpenAudioMc.getService(NetworkingService.class).getClients().isEmpty()) {
            stop();
        }
    }

    /**
     * A new client got registered! let's finish their signup
     * @param clientConnection
     */
    private void handleClientConnection(ClientConnection clientConnection) {
        // nothing to register if we aren't connected
        pushEvent(VoiceServerEventType.ADD_PLAYER, new HashMap<String, String>() {{
            put("playerName", clientConnection.getUser().getName());
            put("playerUuid", clientConnection.getUser().getUniqueId().toString());
            put("streamKey", clientConnection.getRtcSessionManager().getStreamKey());
        }});
    }

    /**
     * Mute a player on RTC level (for moderation)
     * @param clientConnection
     */
    public void forceMute(ClientConnection clientConnection) {
        pushEvent(VoiceServerEventType.FORCE_MUTE_PLAYER, new HashMap<String, String>() {{
            put("streamKey", clientConnection.getRtcSessionManager().getStreamKey());
        }});
        clientConnection.getRtcSessionManager().getStateFlags().add(RtcStateFlag.FORCE_MUTED);
    }

    /**
     * Unmute a player on RTC level (for moderation)
     * @param clientConnection
     */
    public void forceUnmute(ClientConnection clientConnection) {
        pushEvent(VoiceServerEventType.FORCE_UNMUTE_PLAYER, new HashMap<String, String>() {{
            put("streamKey", clientConnection.getRtcSessionManager().getStreamKey());
        }});
        clientConnection.getRtcSessionManager().getStateFlags().remove(RtcStateFlag.FORCE_MUTED);
    }


    /**
     * Count current used slots
     * @return Amount of clients connected to voicechat
     */
    public int getUsedSlots() {
        return (int) OpenAudioMc.getService(NetworkingService.class).getClients()
                .stream()
                .filter(client -> client.getRtcSessionManager().isReady())
                .count();
    }

    /**
     * Send a packet, if we're connected
     * @param event
     * @param arguments
     */
    private void pushEvent(VoiceServerEventType event, Map<String, String> arguments) {
        if (status != VoiceApiStatus.CONNECTED) return;
        StringBuilder eventData = new StringBuilder(event.name());

        // format it like EVENT_TYPE~key=value~key=value
        for (Map.Entry<String, String> entry : arguments.entrySet()) {
            eventData.append("~").append(entry.getKey()).append("=").append(entry.getValue());
        }

        this.voiceSocket.pushEventBody(eventData.toString());
    }

}
