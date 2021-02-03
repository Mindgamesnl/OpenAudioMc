package com.craftmend.openaudiomc.generic.craftmend.response;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CraftmendAccountResponse extends AbstractRestResponse {

    private OpenAudioSettingsResponse settings;
    private boolean claimed = false;
    private String relay;
    private String name;

    public static class OpenAudioSettingsResponse {
        @Getter private String clientUrl;
        @Getter private String startSound;
        @Getter private String startButton;
        @Getter private String backgroundImage;
        @Getter private String activeMessage;
        @Getter private String errorMessage;
        @Getter private String title;
        @Getter private String color;
        @Getter private String ambianceSound;
        @Getter private boolean banned = false;
    }
}