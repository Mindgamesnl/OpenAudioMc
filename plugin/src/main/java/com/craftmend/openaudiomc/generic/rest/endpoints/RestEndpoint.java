package com.craftmend.openaudiomc.generic.rest.endpoints;

import com.craftmend.openaudiomc.OpenAudioMc;

public enum RestEndpoint {

    ENDPOINT_REGISTER("/api/v1/servers/register"),
    ENDPOINT_LOGIN("/api/v1/servers/login/{private_key}"),
    ENDPOINT_LOGOUT("/api/v1/servers/logout/{private_key}"),

    ENDPOINT_PLUS_GENTOKEN("/api/v1/servers/createlogin"), // POST
    ENDPOINT_PLUS_GET_SETTINGS("/api/v1/public/settings/{public_key}"),
    ENDPOINT_PLUS_SAVE_SETTINGS("/api/v1/plus/settings"), // POST
    ENDPOINT_PLUS_UPDATE_PLAYERS("/api/v1/plus/players"); // ALSO POST

    private String url;
    RestEndpoint(String url) {
        this.url = url;
    }

    public String getURL() {
        this.url = this.url.replace("{private_key}", OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPrivateKey().getValue());
        this.url = this.url.replace("{public_key}", OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPublicKey().getValue());
        return this.url;
    }
}
