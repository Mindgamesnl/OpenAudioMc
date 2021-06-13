package com.craftmend.openaudiomc.generic.voicechat.driver;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.ClientRequestVoiceEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientUnlockVoiceChat;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceChatUnlockPayload;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskProvider;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;
import com.craftmend.openaudiomc.generic.voicechat.bus.VoiceEventBus;
import com.craftmend.openaudiomc.generic.voicechat.enums.VoiceServerEventType;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

public class VoiceServerDriver {

    private final String host;
    private final String password;
    private VoiceService service;
    private List<UUID> subscribers = new ArrayList<>();
    @Setter
    private int blockRadius = -1;
    private TaskProvider taskProvider;
    private List<Integer> tasks = new ArrayList<>();
    private boolean taskStarted = false;
    private boolean taskRunning = false;
    @Getter private boolean failed = false;

    @Setter
    private VoiceEventBus eventBus;

    /**
     * Blocking method that tries to login to a server and establish a connection
     *
     * @param host     Server full host (eg https://joostspeeltspellen.voice.openaudiomc.net/) with a trailing slash
     * @param password Server password
     * @param service  Voice service to manage
     */
    public VoiceServerDriver(String host, String password, VoiceService service) {
        this.host = host;
        this.password = password;
        this.service = service;
        this.taskProvider = OpenAudioMc.getInstance().getTaskProvider();

        // populate event bus
        this.eventBus = new VoiceEventBus(
                this.host,
                password,
                this
        );
        this.populateEventBus();
    }

    private boolean populateEventBus() {
        this.eventBus.onError(() -> {
            this.eventBus.stop();

            // oi its fucked
            for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
                if (client.getClientRtcManager().isReady()) {
                    client.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_UNSTABLE.getString()));
                }
            }

            failed = true;
            shutdown();
            taskProvider.schduleSyncDelayedTask(() -> taskProvider.runAsync(() -> OpenAudioMc.getInstance().getCraftmendService().kickstartVcHandshake()), 40);
        });

        this.eventBus.onReady(() -> {
            OpenAudioLogger.toConsole("Vc eb is healthy and connected");
            failed = false;

            // verify login with a heartbeat
            pushEvent(VoiceServerEventType.HEARTBEAT, new HashMap<>());

            // schedule heartbeat every few seconds
            if (!taskStarted) {
                tasks.add(taskProvider.scheduleAsyncRepeatingTask(() -> {
                    // send heartbeat
                    if (taskRunning) {
                        pushEvent(VoiceServerEventType.HEARTBEAT, new HashMap<>());
                    }
                }, 80, 80));
                taskStarted = true;
            }
            taskRunning = true;

            // might be a restart, so clean all
            OpenAudioMc.getInstance().getNetworkingService().getClients().forEach(this::handleClientConnection);

            // setup events
            NetworkingService networkingService = OpenAudioMc.getInstance().getNetworkingService();

            if (networkingService instanceof DefaultNetworkingService) {
                // client got created
                subscribers.add(networkingService.subscribeToConnections((this::handleClientConnection)));

                subscribers.add(networkingService.subscribeToDisconnections((clientConnection -> {
                    // client will be removed
                    pushEvent(VoiceServerEventType.REMOVE_PLAYER, new HashMap<String, String>() {{
                        put("streamKey", clientConnection.getStreamKey());
                    }});
                })));
            } else {
                throw new IllegalStateException("Not implemented yet");
            }

            OpenAudioLogger.toConsole("Successfully logged into a WebRTC server");
        });

        // try to login
        if (!this.eventBus.start()) {
            // denied
            this.eventBus.stop();
            return false;
        }
        return true;
    }

    private void handleClientConnection(ClientConnection clientConnection) {
        pushEvent(VoiceServerEventType.ADD_PLAYER, new HashMap<String, String>() {{
            put("playerName", clientConnection.getPlayer().getName());
            put("playerUuid", clientConnection.getPlayer().getUniqueId().toString());
            put("streamKey", clientConnection.getStreamKey());
        }});

        clientConnection.onConnect(() -> {

            // is it allowed?
            if (this.service.getUsedSlots() >= this.service.getAllowedSlots()) {
                clientConnection.getPlayer().sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + "VoiceChat couldn't be enabled since this server occupied all its slots, please notify a staff member and try again later.");
                return;
            }

            // schedule async check
            taskProvider.runAsync(() -> {
                // make an event, and invite the client if it isn't cancelled
                ClientRequestVoiceEvent event = OpenAudioMc.getInstance().getApiEventDriver().fire(new ClientRequestVoiceEvent(clientConnection));
                if (!event.isCanceled()) {
                    clientConnection.sendPacket(new PacketClientUnlockVoiceChat(new ClientVoiceChatUnlockPayload(
                            clientConnection.getStreamKey(),
                            this.host,
                            blockRadius
                    )));
                }
            });
        });
    }

    public void shutdown() {
        // end main session
        new RestRequest(RestEndpoint.END_VOICE_SESSION).executeInThread();

        for (Integer task : tasks) {
            taskProvider.cancelRepeatingTask(task);
        }

        // logout
        pushEvent(VoiceServerEventType.LOGOUT, new HashMap<>());

        NetworkingService networkingService = OpenAudioMc.getInstance().getNetworkingService();
        for (UUID subscriber : subscribers) {
            networkingService.unsubscribeClientEventHandler(subscriber);
        }

        // kick all clients who had rtc open
        for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            if (client.getClientRtcManager().isReady()) {
                client.kick();
            }
        }

        taskRunning = false;
        this.service.fireShutdownEvents();
    }

    private void pushEvent(VoiceServerEventType event, Map<String, String> arguments) {
        if (this.eventBus == null) return;
        StringBuilder eventData = new StringBuilder(event.name());

        // format it like EVENT_TYPE~key=value~key=value
        for (Map.Entry<String, String> entry : arguments.entrySet()) {
            eventData.append("~").append(entry.getKey()).append("=").append(entry.getValue());
        }

        this.eventBus.pushEventBody(eventData.toString());
    }

}
