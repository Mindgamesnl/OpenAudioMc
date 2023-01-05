package com.craftmend.openaudiomc.generic.craftmend.response;

import com.craftmend.openaudiomc.generic.craftmend.enums.AddonCategory;
import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OpenaudioSettingsResponse extends AbstractRestResponse {

    private OpenAudioAddonResponse[] addons = new OpenAudioAddonResponse[]{};
    private OpenAudioSettingsResponse settings = new OpenAudioSettingsResponse();
    private boolean claimed = false;
    private String relay = "";
    private String name = "";
    @SerializedName("rtc")
    private String rtcHash = "";

    public boolean hasAddon(AddonCategory addonCategory) {
        for (OpenAudioAddonResponse addon : addons) {
            if (addon.getCategory() == addonCategory) return true;
        }
        return false;
    }

    public OpenAudioAddonResponse getAddon(AddonCategory category) {
        OpenAudioAddonResponse bestMath = null;
        int limit = -1;
        for (OpenAudioAddonResponse addon : addons) {
            if (addon.getCategory() == category) {
                if (addon.getLimit() > limit) {
                    limit = addon.getLimit();
                    bestMath = addon;
                }
            }
        }
        return bestMath;
    }

    @Getter
    public static class OpenAudioSettingsResponse {
        private int voicechatSlots = 0;
        private boolean claimed = false;
        private boolean banned = false;
        private String clientUrl = "";
        private String startSound = "";
        private String startButton = "";
        private String backgroundImage = "";
        private String activeMessage = "";
        private String errorMessage = "";
        private String title = "";
        private String color = "";
        private String ambianceSound = "";
        private String welcomeMessage = "";
        private boolean useTranslations = false;
        private String displayName = "";
        private boolean isVoicechatEnabled = false;
    }

    @Getter
    public static class OpenAudioAddonResponse {
        private AddonCategory category;
        private String type = "";
        private String title = "";
        private String description = "";
        private int limit = 0;
    }
}