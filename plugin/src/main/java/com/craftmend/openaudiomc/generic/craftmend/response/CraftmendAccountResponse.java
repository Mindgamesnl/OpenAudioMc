package com.craftmend.openaudiomc.generic.craftmend.response;

import com.craftmend.openaudiomc.generic.craftmend.enums.AddonCategory;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CraftmendAccountResponse extends AbstractRestResponse {

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
        private final String clientUrl = "";
        private final String startSound = "";
        private final String startButton = "";
        private final String backgroundImage = "";
        private final String activeMessage = "";
        private final String errorMessage = "";
        private final String title = "";
        private final String color = "";
        private final String ambianceSound = "";
        private final boolean banned = false;
    }

    @Getter
    public static class OpenAudioAddonResponse {
        private AddonCategory category;
        private final String type = "";
        private final String title = "";
        private final String description = "";
        private final int limit = 0;
    }
}