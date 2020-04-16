package com.craftmend.openaudiomc.generic.plus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.plus.response.PlusLoginToken;
import com.craftmend.openaudiomc.generic.plus.tasks.PlayerSynchroniser;
import com.craftmend.openaudiomc.generic.plus.updates.CreateLoginPayload;
import com.craftmend.openaudiomc.generic.rest.RestRequest;

import java.util.concurrent.CompletableFuture;

public class PlusService {

    private PlayerSynchroniser playerSynchroniser;
    private OpenAudioMc main;

    public PlusService(OpenAudioMc openAudioMc) {
        main = openAudioMc;
        playerSynchroniser = new PlayerSynchroniser(this, openAudioMc);
    }

    public CompletableFuture<String> createLoginToken(String playerName) {
        CompletableFuture<String> cf = new CompletableFuture<>();
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            CreateLoginPayload createLoginPayload = new CreateLoginPayload(playerName, main.getAuthenticationService().getServerKeySet().getPrivateKey().getValue());
            RestRequest keyRequest = new RestRequest("/api/v1/servers/createlogin");
            keyRequest.setBody(OpenAudioMc.getGson().toJson(createLoginPayload));
            keyRequest.execute().thenAccept(response -> {
               if (!response.getErrors().isEmpty()) throw new IllegalArgumentException("Auth failed!");

                PlusLoginToken plusLoginToken = response.getResponse(PlusLoginToken.class);
                cf.complete(plusLoginToken.getToken());
            });
        });
        return cf;
    }

    public void shutdown() {
        playerSynchroniser.deleteAll();
        createLoginToken(null);
    }

}
