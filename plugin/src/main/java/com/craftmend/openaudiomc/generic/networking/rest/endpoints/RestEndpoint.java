package com.craftmend.openaudiomc.generic.networking.rest.endpoints;

import com.craftmend.openaudiomc.OpenAudioMc;

public enum RestEndpoint {

    ENDPOINT_REGISTER("/api/v1/servers/register", false),
    ENDPOINT_LOGIN("/api/v1/servers/login/{private_key}", true),
    ENDPOINT_LOGOUT("/api/v1/servers/logout/{private_key}", true),

    ENDPOINT_PLUS_GENTOKEN("/api/v1/servers/createlogin", false), // POST
    ENDPOINT_PLUS_GET_SETTINGS("/api/v1/public/settings/{public_key}", true),
    ENDPOINT_PLUS_SAVE_SETTINGS("/api/v1/plus/settings", false), // POST
    ENDPOINT_PLUS_UPDATE_PLAYERS("/api/v1/plus/players", false); // ALSO POST

    private String url;
    private boolean translate;
    RestEndpoint(String url, boolean translate) {
        this.url = url;
        this.translate = translate;
    }

    public String getURL() {
        if (this.translate) {
            this.url = this.url.replaceAll("{private_key}", OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPrivateKey().getValue());
            this.url = this.url.replaceAll("{public_key}", OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPublicKey().getValue());
        }
        return this.url;
    }
}
