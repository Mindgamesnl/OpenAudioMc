package com.craftmend.openaudiomc.generic.voicechat.driver;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;

public class VoiceServerDriver {

    private String host;
    private String password;
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

}
