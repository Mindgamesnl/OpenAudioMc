package com.craftmend.openaudiomc.generic.plus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.plus.enums.PlusAccessLevel;
import com.craftmend.openaudiomc.generic.plus.object.FlagSet;
import com.craftmend.openaudiomc.generic.plus.response.ClientSettingsResponse;
import com.craftmend.openaudiomc.generic.plus.response.PlusLoginToken;
import com.craftmend.openaudiomc.generic.plus.socket.PlusConnectionManager;
import com.craftmend.openaudiomc.generic.plus.tasks.PlayerStateStreamer;
import com.craftmend.openaudiomc.generic.plus.updates.CreateLoginPayload;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import lombok.Getter;

import java.util.concurrent.CompletableFuture;

public class PlusService {

    @Getter private PlusConnectionManager connectionManager = new PlusConnectionManager();
    private PlayerStateStreamer playerStateStreamer;
    @Getter private String baseUrl;
    @Getter private boolean plusEnabled;
    @Getter private PlusAccessLevel accessLevel;
    private OpenAudioMc openAudioMc;
    @Getter private FlagSet flagSet;

    public PlusService(OpenAudioMc openAudioMc) {
        this.openAudioMc = openAudioMc;
        this.flagSet = new FlagSet();
        getPlusSettings();
        playerStateStreamer = new PlayerStateStreamer(this, openAudioMc);
        accessLevel = PlusAccessLevel.valueOf(openAudioMc.getConfiguration().getString(StorageKey.SETTINGS_PLUS_ACCESS_LEVEL));
    }

    public CompletableFuture<String> createLoginToken(String playerName) {
        CompletableFuture<String> cf = new CompletableFuture<>();
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            cf.complete(doLoginRequest(playerName));
        });
        return cf;
    }

    public String doLoginRequest(String playerName) {
        CreateLoginPayload createLoginPayload = new CreateLoginPayload(playerName, openAudioMc.getAuthenticationService().getServerKeySet().getPrivateKey().getValue());
        RestRequest keyRequest = new RestRequest(RestEndpoint.PLUS_GEN_SESSION);
        keyRequest.setBody(createLoginPayload);
        ApiResponse response = keyRequest.executeInThread();
        if (!response.getErrors().isEmpty()) throw new IllegalArgumentException("Auth failed!");

        PlusLoginToken plusLoginToken = response.getResponse(PlusLoginToken.class);
        return plusLoginToken.getToken();
    }

    public void getPlusSettings() {
        RestRequest keyRequest = new RestRequest(RestEndpoint.PLUS_GET_SETTINGS);
        ClientSettingsResponse response = keyRequest.executeInThread().getResponse(ClientSettingsResponse.class);
        baseUrl = response.getDomain() + "#";
        plusEnabled = response.getPlayerSync();
    }

    public void shutdown() {
        playerStateStreamer.deleteAll(true);
        doLoginRequest(null);
    }

}
