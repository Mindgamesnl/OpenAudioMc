package com.craftmend.openaudiomc.generic.craftmend;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.enums.AddonCategory;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.craftmend.interfaces.TagUpdateListener;
import com.craftmend.openaudiomc.generic.craftmend.response.CraftmendAccountResponse;
import com.craftmend.openaudiomc.generic.craftmend.response.VoiceSessionRequestResponse;
import com.craftmend.openaudiomc.generic.craftmend.tasks.PlayerStateStreamer;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;
import lombok.Getter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CraftmendService {

    private PlayerStateStreamer playerStateStreamer;
    @Getter private String baseUrl;
    private final OpenAudioMc openAudioMc;
    @Getter private CraftmendAccountResponse accountResponse = new CraftmendAccountResponse();
    @Getter private VoiceService voiceService;
    @Getter private Set<CraftmendTag> tags = new HashSet<>();
    private List<TagUpdateListener> tagUpdateSubscribers = new ArrayList<>();

    public CraftmendService(OpenAudioMc openAudioMc, VoiceService voiceService) {
        this.openAudioMc = openAudioMc;
        this.voiceService = voiceService;
        syncAccount();
        startSyncronizer();

        voiceService.onShutdown(() -> {
            // restart in 10 seconds
            openAudioMc.getTaskProvider().schduleSyncDelayedTask(this::startVoiceHandshake, 20 * 20);
            OpenAudioLogger.toConsole("Voicechat had to shut down. Restarting in 20 seconds.");
        });
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

        for (CraftmendTag tag : tags) {
            for (TagUpdateListener tagUpdateSubscriber : tagUpdateSubscribers) {
                tagUpdateSubscriber.onRemove(tag);
            }
        }
        tags.clear();

        baseUrl = response.getSettings().getClientUrl() + "#";
        if (response.getSettings().isBanned()) addTag(CraftmendTag.BANNED);
        if (response.isClaimed()) addTag(CraftmendTag.CLAIMED);
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

    public boolean is(CraftmendTag tag) {
        return tags.contains(tag);
    }

    public void addTag(CraftmendTag tag) {
        tags.add(tag);
        for (TagUpdateListener tagUpdateSubscriber : tagUpdateSubscribers) {
            tagUpdateSubscriber.onAdd(tag);
        }
    }

    private void removeTag(CraftmendTag tag) {
        tags.remove(tag);
        for (TagUpdateListener tagUpdateSubscriber : tagUpdateSubscribers) {
            tagUpdateSubscriber.onRemove(tag);
        }
    }

    public void onTagUpdate(TagUpdateListener runnable) {
        tagUpdateSubscribers.add(runnable);
        if (tags.size() != 0) {
            for (CraftmendTag tag : tags) {
                runnable.onAdd(tag);
            }
        }
    }

    void startVoiceHandshake() {
        OpenAudioLogger.toConsole("VoiceChat seems to be enabled for this account! Requesting RTC and Password...");
        // do magic, somehow fail, or login to the voice server
        RestRequest request = new RestRequest(RestEndpoint.START_VOICE_SESSION);

        request.executeAsync()
                .thenAccept(response -> {
                    if (response.getErrors().size() != 0) {
                        ErrorCode errorCode = response.getErrors().get(0).getCode();

                        if (errorCode == ErrorCode.NO_RTC) {
                            OpenAudioLogger.toConsole("Failed to initialize voice chat. There aren't any servers that can handle your request. Trying again in 20 seconds.");
                            openAudioMc.getTaskProvider().schduleSyncDelayedTask(this::startVoiceHandshake, 20 * 20);
                            return;
                        }

                        if (errorCode == ErrorCode.NO_PERMISSIONS) {
                            OpenAudioLogger.toConsole("Your account doesn't actually have permissions for voicechat, shutting down.");
                            removeTag(CraftmendTag.VOICECHAT);
                            return;
                        }

                        if (errorCode == ErrorCode.ALREADY_ACTIVE) {
                            OpenAudioLogger.toConsole("This server still has a session running with voice chat, terminating and trying again in 20 seconds.");
                            openAudioMc.getTaskProvider().schduleSyncDelayedTask(this::startVoiceHandshake, 20 * 20);
                            return;
                        }
                        OpenAudioLogger.toConsole("Failed to initialize voice chat. Error: " + response.getErrors().get(0).getMessage());
                        return;
                    }

                    VoiceSessionRequestResponse voiceResponse = response.getResponse(VoiceSessionRequestResponse.class);
                    int highestPossibleLimit = accountResponse.getAddon(AddonCategory.VOICE).getLimit();
                    this.voiceService.connect(voiceResponse.getServer(), voiceResponse.getPassword(), highestPossibleLimit);
                    addTag(CraftmendTag.VOICECHAT);
                });
    }

}
