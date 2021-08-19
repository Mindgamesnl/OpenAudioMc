package com.craftmend.openaudiomc.generic.voicechat.bus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.ClientRequestVoiceEvent;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.networking.client.enums.RtcStateFlag;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientUnlockVoiceChat;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceChatUnlockPayload;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.voicechat.enums.VoiceApiStatus;
import com.craftmend.openaudiomc.generic.voicechat.enums.VoiceServerEventType;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

public class VoiceApiConnection {

    private static final Map<String, String> EMPTY_PAYLOAD = new HashMap<>();
    @Getter private VoiceApiStatus status = VoiceApiStatus.IDLE;
    private VoiceWebsocket voiceWebsocket;
    private TaskService taskService;

    @Getter private int maxSlots = 0;
    @Getter private String host = "none";

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
                handleClientConnection(clientConnection);

                clientConnection.onConnect(() -> {
                    if (status != VoiceApiStatus.CONNECTED) return;
                    // is it allowed?
                    if (getUsedSlots() >= maxSlots) {
                        clientConnection.getPlayer().sendMessage(OpenAudioMc.getService(CommandService.class).getCommandPrefix() + "VoiceChat couldn't be enabled since this server occupied all its slots, please notify a staff member and try again later.");
                        return;
                    }

                    // update state
                    if (clientConnection.getClientRtcManager().getStateFlags().contains(RtcStateFlag.FORCE_MUTED)) {
                        forceMute(clientConnection);
                    }

                    // schedule async check
                    taskService.runAsync(() -> {
                        // make an event, and invite the client if it isn't cancelled
                        ClientRequestVoiceEvent event = OpenAudioMc.getInstance().getApiEventDriver().fire(new ClientRequestVoiceEvent(clientConnection));
                        if (!event.isCanceled()) {
                            clientConnection.sendPacket(new PacketClientUnlockVoiceChat(new ClientVoiceChatUnlockPayload(
                                    clientConnection.getStreamKey(),
                                    this.host,
                                    StorageKey.SETTINGS_VC_RADIUS.getInt()
                            )));
                        }
                    });
                });
            });

            networkingService.subscribeToDisconnections((clientConnection ->{
                // client will be removed
                pushEvent(VoiceServerEventType.REMOVE_PLAYER, new HashMap<String, String>() {{
                    put("streamKey", clientConnection.getStreamKey());
                }});
            }));
        }
    }

    public void start(String server, String password, int slots) {
        // only connect when idle
        if (status != VoiceApiStatus.IDLE) return;
        status = VoiceApiStatus.CONNECTING;
        maxSlots = slots;
        host = server;
        taskService.runAsync(() -> {
            // setup link
            voiceWebsocket = new VoiceWebsocket(server, password);
            // setup hooks
            voiceWebsocket.onError(this::onWsClose);
            voiceWebsocket.onReady(this::onWsOpen);
            // start?
            boolean success = voiceWebsocket.start();
            if (success) {
                OpenAudioLogger.toConsole("Attempting to login to voice chat...");
            } else {
                OpenAudioLogger.toConsole("Failed to initialize voice events.");
                status = VoiceApiStatus.IDLE;
            }
        });
    }

    public void stop() {
        if (voiceWebsocket == null) return;
        this.voiceWebsocket.stop();
        this.onWsClose();
    }

    private void onWsClose() {
        if (status != VoiceApiStatus.CONNECTED) return;
        pushEvent(VoiceServerEventType.LOGOUT, new HashMap<>());
        status = VoiceApiStatus.IDLE;
        // we disconnected! only fires once
        // logout, since we're not using this session anymore
        new RestRequest(RestEndpoint.END_VOICE_SESSION).executeInThread();
        for (ClientConnection client : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            if (client.getClientRtcManager().isReady()) {
                client.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_UNSTABLE.getString()));
                client.kick();
            }
        }
        OpenAudioLogger.toConsole("Expected voicechat shut down.");
    }

    private void onWsOpen() {
        if (status == VoiceApiStatus.CONNECTED) return;
        OpenAudioLogger.toConsole("Connected to voicechat!");
        status = VoiceApiStatus.CONNECTED;
        // seed online players
        pushEvent(VoiceServerEventType.HEARTBEAT, EMPTY_PAYLOAD);
        pushEvent(VoiceServerEventType.HEARTBEAT, EMPTY_PAYLOAD);
        OpenAudioMc.getService(NetworkingService.class).getClients().forEach(this::handleClientConnection);
    }

    /**
     * A new client got registered! let's finish their signup
     * @param clientConnection
     */
    private void handleClientConnection(ClientConnection clientConnection) {
        // nothing to register if we aren't connected
        pushEvent(VoiceServerEventType.ADD_PLAYER, new HashMap<String, String>() {{
            put("playerName", clientConnection.getPlayer().getName());
            put("playerUuid", clientConnection.getPlayer().getUniqueId().toString());
            put("streamKey", clientConnection.getStreamKey());
        }});
    }

    /**
     * Mute a player on RTC level (for moderation)
     * @param clientConnection
     */
    public void forceMute(ClientConnection clientConnection) {
        pushEvent(VoiceServerEventType.FORCE_MUTE_PLAYER, new HashMap<String, String>() {{
            put("streamKey", clientConnection.getStreamKey());
        }});
        clientConnection.getClientRtcManager().getStateFlags().add(RtcStateFlag.FORCE_MUTED);
    }

    /**
     * Unmute a player on RTC level (for moderation)
     * @param clientConnection
     */
    public void forceUnmute(ClientConnection clientConnection) {
        pushEvent(VoiceServerEventType.FORCE_UNMUTE_PLAYER, new HashMap<String, String>() {{
            put("streamKey", clientConnection.getStreamKey());
        }});
        clientConnection.getClientRtcManager().getStateFlags().remove(RtcStateFlag.FORCE_MUTED);
    }


    /**
     * Count current used slots
     * @return Amount of clients connected to voicechat
     */
    public int getUsedSlots() {
        return (int) OpenAudioMc.getService(NetworkingService.class).getClients()
                .stream()
                .filter(client -> client.getClientRtcManager().isReady())
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

        this.voiceWebsocket.pushEventBody(eventData.toString());
    }

}
