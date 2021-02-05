package com.craftmend.openaudiomc.generic.craftmend;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.enums.AddonCategory;
import com.craftmend.openaudiomc.generic.craftmend.response.CraftmendAccountResponse;
import com.craftmend.openaudiomc.generic.craftmend.tasks.PlayerStateStreamer;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;
import lombok.Getter;

public class CraftmendService {

    private PlayerStateStreamer playerStateStreamer;
    @Getter private String baseUrl;
    private final OpenAudioMc openAudioMc;
    @Getter private boolean banned = false;
    @Getter private boolean claimed = false;
    @Getter private CraftmendAccountResponse accountResponse = new CraftmendAccountResponse();
    @Getter private VoiceService voiceService;

    public CraftmendService(OpenAudioMc openAudioMc, VoiceService voiceService) {
        this.openAudioMc = openAudioMc;
        this.voiceService = voiceService;
        syncAccount();
        startSyncronizer();
    }

    public void startSyncronizer() {
        if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) return;
        if (playerStateStreamer == null || !playerStateStreamer.isRunning()) {
            playerStateStreamer = new PlayerStateStreamer(this, openAudioMc);
        }
    }

    public void syncAccount() {
        if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) return;
        // stop the voice service
        this.voiceService.shutdown();
        RestRequest keyRequest = new RestRequest(RestEndpoint.GET_ACCOUNT_STATE);
        CraftmendAccountResponse response = keyRequest.executeInThread().getResponse(CraftmendAccountResponse.class);
        baseUrl = response.getSettings().getClientUrl() + "#";
        banned = response.getSettings().isBanned();
        claimed = response.isClaimed();
        accountResponse = response;

        // is voice enabled with the new system?
        if (accountResponse.hasAddon(AddonCategory.VOICE)) {
            startVoiceHandshake();
        }
    }

    public void shutdown() {
        if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) return;
        this.voiceService.shutdown();
        playerStateStreamer.deleteAll(true);
    }

    private void startVoiceHandshake() {
        OpenAudioLogger.toConsole("VoiceChat seems to be enabled for this account! Requesting RTC and Password...");
        // do magic, somehow fail, or login to the voice server
    }

}
