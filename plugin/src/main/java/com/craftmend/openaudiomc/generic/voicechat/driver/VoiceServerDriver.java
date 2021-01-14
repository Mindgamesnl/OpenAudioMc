package com.craftmend.openaudiomc.generic.voicechat.driver;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;
import com.craftmend.openaudiomc.generic.voicechat.enums.VoiceServerEventType;

import java.util.HashMap;
import java.util.Map;

public class VoiceServerDriver {

    private final String host;
    private final String password;
    private VoiceService service;

    /**
     * Blocking method that tries to login to a server and establish a connection
     * @param host Server full host (eg https://joostspeeltspellen.voice.openaudiomc.net/)
     * @param password Server password
     * @param service Voice service to manage
     */
    public VoiceServerDriver(String host, String password, VoiceService service) {
        this.host = host;
        this.password = password;
        this.service = service;
        login();

        // schedule heartbeat every 5 seconds
        OpenAudioMc.getInstance().getTaskProvider().scheduleAsyncRepeatingTask(() -> {
            // send heartbeat
            pushEvent(VoiceServerEventType.HEARTBEAT, new HashMap<>());
        }, 100, 100);
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

    private void pushEvent(VoiceServerEventType event, Map<String, String> arguments) {
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

        ApiResponse response = eventRequest.executeInThread();
        if (!response.getErrors().isEmpty()) {
            throw new IllegalArgumentException("The voice server is either invalid or denies your event");
        }
    }

}
