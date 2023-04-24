package com.craftmend.openaudiomc.generic.oac.response;

import com.craftmend.openaudiomc.generic.oac.enums.AccountState;
import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OpenaudioSettingsResponse extends AbstractRestResponse {

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
    private boolean isPatreon = false;

    public boolean hasState(AccountState addonCategory) {
        switch (addonCategory) {
            case ACCOUNT:
                return claimed;
            case VOICE:
                return voicechatSlots > 0 && isVoicechatEnabled;
        }
        return false;
    }

}