package com.craftmend.openaudiomc.generic.craftmend.response;

import com.craftmend.openaudiomc.generic.craftmend.enums.AccountState;
import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OpenaudioSettingsResponse extends AbstractRestResponse {

    private OpenAudioSettingsResponse settings = new OpenAudioSettingsResponse();
    private String relay = "";
    private String name = "";
    @SerializedName("rtc")
    private String rtcHash = "";

    public boolean hasState(AccountState addonCategory) {
        switch (addonCategory) {
            case ACCOUNT:
                return settings.claimed;
            case VOICE:
                return settings.voicechatSlots > 0;
        }
        return false;
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

}