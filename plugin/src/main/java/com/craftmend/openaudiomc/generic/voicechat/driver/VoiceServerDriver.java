package com.craftmend.openaudiomc.generic.voicechat.driver;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientUnlockVoicechat;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceChatUnlockPayload;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;
import com.craftmend.openaudiomc.generic.voicechat.enums.VoiceServerEventType;
import lombok.Setter;

import java.util.*;

public class VoiceServerDriver {

    private final String host;
    private final String password;
    private VoiceService service;
    private List<UUID> subscribers = new ArrayList<>();
    @Setter private int blockRadius = -1;

    /**
     * Blocking method that tries to login to a server and establish a connection
     * @param host Server full host (eg https://joostspeeltspellen.voice.openaudiomc.net/) with a trailing slash
     * @param password Server password
     * @param service Voice service to manage
     */
    public VoiceServerDriver(String host, String password, VoiceService service) {
        this.host = host;
        this.password = password;
        this.service = service;

        // try to login
        login();

        // verify login with a heartbeat
        pushEvent(VoiceServerEventType.HEARTBEAT, new HashMap<>(), true);

        // schedule heartbeat every 5 seconds
        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(() -> {
            // send heartbeat
            pushEvent(VoiceServerEventType.HEARTBEAT, new HashMap<>(), true);
        }, 100, 100);

        // setup events
        NetworkingService networkingService = OpenAudioMc.getInstance().getNetworkingService();
        if (networkingService instanceof DefaultNetworkingService) {
            subscribers.add(networkingService.subscribeToConnections((clientConnection -> {
                // client got created
                pushEvent(VoiceServerEventType.ADD_PLAYER, new HashMap<String, String>() {{
                    put("playerName", clientConnection.getPlayer().getName());
                    put("playerUuid", clientConnection.getPlayer().getUniqueId().toString());
                    put("streamKey", clientConnection.getStreamKey());
                }}, false);

                clientConnection.onConnect(() -> {
                    // unlock capabilities
                    clientConnection.sendPacket(new PacketClientUnlockVoicechat(new ClientVoiceChatUnlockPayload(
                            clientConnection.getStreamKey(),
                            this.host,
                            blockRadius
                    )));
                });
            })));

            subscribers.add(networkingService.subscribeToDisconnections((clientConnection -> {
                // client will be removed
                pushEvent(VoiceServerEventType.REMOVE_PLAYER, new HashMap<String, String>() {{
                    put("streamKey", clientConnection.getStreamKey());
                }}, false);
            })));
        } else {
            throw new IllegalStateException("Not implemented yet");
        }
    }

    public void shutdown() {
        // logout
        pushEvent(VoiceServerEventType.LOGOUT, new HashMap<>(), true);
        NetworkingService networkingService = OpenAudioMc.getInstance().getNetworkingService();
        for (UUID subscriber : subscribers) {
            networkingService.unsubscribeClientEventHandler(subscriber);
        }
    }

    private void login() {
        RestRequest loginRequest = new RestRequest(RestEndpoint.VOICE_LOGIN.setHost(this.host));

        // add query shit
        AuthenticationService authenticationService = OpenAudioMc.getInstance().getAuthenticationService();
        loginRequest.setQuery("publicKey", authenticationService.getServerKeySet().getPublicKey().getValue());
        loginRequest.setQuery("privateKey", authenticationService.getServerKeySet().getPrivateKey().getValue());
        loginRequest.setQuery("password", this.password);

        ApiResponse response = loginRequest.executeInThread();
        if (!response.getErrors().isEmpty()) {
            throw new IllegalArgumentException("The voice server is either invalid or denies your login");
        }
    }

    private void pushEvent(VoiceServerEventType event, Map<String, String> arguments, boolean now) {
        RestRequest eventRequest = new RestRequest(RestEndpoint.VOICE_EVENTS.setHost(this.host));

        // add query shit
        AuthenticationService authenticationService = OpenAudioMc.getInstance().getAuthenticationService();
        eventRequest.setQuery("publicKey", authenticationService.getServerKeySet().getPublicKey().getValue());
        eventRequest.setQuery("privateKey", authenticationService.getServerKeySet().getPrivateKey().getValue());
        eventRequest.setQuery("event", event.name());

        for (Map.Entry<String, String> entry : arguments.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            eventRequest.setQuery(key, value);
        }

        if (now) {
            ApiResponse response = eventRequest.executeInThread();
            if (!response.getErrors().isEmpty()) {
                throw new IllegalArgumentException("The voice server is either invalid or denies your event");
            }
        } else {
            eventRequest.executeAsync().thenAccept(response -> {
                if (!response.getErrors().isEmpty()) {
                    throw new IllegalArgumentException("The voice server is either invalid or denies your event");
                }
            });
        }
    }

}
