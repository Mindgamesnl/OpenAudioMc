package com.craftmend.openaudiomc.generic.craftmend;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.response.CraftmendAccountResponse;
import com.craftmend.openaudiomc.generic.craftmend.tasks.PlayerStateStreamer;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import lombok.Getter;

public class CraftmendService {

    private PlayerStateStreamer playerStateStreamer;
    @Getter private String baseUrl;
    private OpenAudioMc openAudioMc;
    @Getter private boolean banned = false;
    @Getter private boolean claimed = false;

    public CraftmendService(OpenAudioMc openAudioMc) {
        this.openAudioMc = openAudioMc;
        syncAccount();
        startSyncronizer();
    }

    public void startSyncronizer() {
        if (playerStateStreamer == null || !playerStateStreamer.isRunning()) {
            playerStateStreamer = new PlayerStateStreamer(this, openAudioMc);
        }
    }

    public void syncAccount() {
        RestRequest keyRequest = new RestRequest(RestEndpoint.GET_ACCOUNT_STATE);
        CraftmendAccountResponse response = keyRequest.executeInThread().getResponse(CraftmendAccountResponse.class);
        baseUrl = response.getSettings().getClientUrl() + "#";
        banned = response.getSettings().isBanned();
        claimed = response.isClaimed();
    }

    public void shutdown() {
        playerStateStreamer.deleteAll(true);
    }

}
