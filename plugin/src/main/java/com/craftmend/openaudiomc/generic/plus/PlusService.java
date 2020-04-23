package com.craftmend.openaudiomc.generic.plus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.plus.enums.PlusAccessLevel;
import com.craftmend.openaudiomc.generic.plus.object.FlagSet;
import com.craftmend.openaudiomc.generic.plus.response.ClientSettingsResponse;
import com.craftmend.openaudiomc.generic.plus.response.PlusLoginToken;
import com.craftmend.openaudiomc.generic.plus.tasks.PlayerSynchroniser;
import com.craftmend.openaudiomc.generic.plus.updates.CreateLoginPayload;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.rest.interfaces.GenericApiResponse;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import lombok.Getter;

import java.util.concurrent.CompletableFuture;

public class PlusService {

    private PlayerSynchroniser playerSynchroniser;
    @Getter private String baseUrl;
    @Getter private boolean plusEnabled;
    @Getter private PlusAccessLevel accessLevel;
    private OpenAudioMc openAudioMc;
    @Getter private FlagSet flagSet;

    public PlusService(OpenAudioMc openAudioMc) {
        this.openAudioMc = openAudioMc;
        this.flagSet = new FlagSet();
        getPlusSettings();
        playerSynchroniser = new PlayerSynchroniser(this, openAudioMc);
        accessLevel = PlusAccessLevel.valueOf(openAudioMc.getConfigurationImplementation().getString(StorageKey.SETTINGS_PLUS_ACCESS_LEVEL));
    }

    public CompletableFuture<String> createLoginToken(String playerName) {
        CompletableFuture<String> cf = new CompletableFuture<>();
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            CreateLoginPayload createLoginPayload = new CreateLoginPayload(playerName, openAudioMc.getAuthenticationService().getServerKeySet().getPrivateKey().getValue());
            RestRequest keyRequest = new RestRequest(RestEndpoint.ENDPOINT_PLUS_GENTOKEN);
            keyRequest.setBody(OpenAudioMc.getGson().toJson(createLoginPayload));
            GenericApiResponse response = keyRequest.executeSync();
            if (!response.getErrors().isEmpty()) throw new IllegalArgumentException("Auth failed!");

            PlusLoginToken plusLoginToken = response.getResponse(PlusLoginToken.class);
            cf.complete(plusLoginToken.getToken());
        });
        return cf;
    }

    public void getPlusSettings() {
        RestRequest keyRequest = new RestRequest(RestEndpoint.ENDPOINT_PLUS_GET_SETTINGS);
        ClientSettingsResponse response = keyRequest.executeSync().getResponse(ClientSettingsResponse.class);
        baseUrl = response.getDomain() + "?&data=";
        plusEnabled = response.getPlayerSync();
    }

    public void shutdown() {
        playerSynchroniser.deleteAll(true);
        createLoginToken(null);
    }

}
