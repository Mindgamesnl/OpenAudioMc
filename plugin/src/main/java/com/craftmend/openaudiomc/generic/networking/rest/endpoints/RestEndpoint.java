package com.craftmend.openaudiomc.generic.networking.rest.endpoints;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;

public enum RestEndpoint {

    // EXTERNAL SOURCES
    GITHUB_VERSION_CHECK("https://raw.githubusercontent.com/Mindgamesnl/OpenAudioMc/master/plugin/protocol/static-resources/project_status.json", false),

    // OPENAUDIOMC REST API'S
    ENDPOINT_REGISTER("http://plus.openaudiomc.net/api/v1/servers/register", false),
    ENDPOINT_LOGIN("http://plus.openaudiomc.net/api/v1/servers/login/_private_key_", true),
    ENDPOINT_LOGOUT("http://plus.openaudiomc.net/api/v1/servers/logout/_private_key_", true),
    ENDPOINT_PLUS_GENERATE_TOKEN("http://plus.openaudiomc.net/api/v1/servers/createlogin", false), // POST
    ENDPOINT_PLUS_GET_SETTINGS("http://plus.openaudiomc.net/api/v1/public/settings/_public_key_", true),
    ENDPOINT_PLUS_SAVE_SETTINGS("http://plus.openaudiomc.net/api/v1/plus/settings", false), // POST
    ENDPOINT_PLUS_UPDATE_PLAYERS("http://plus.openaudiomc.net/api/v1/plus/players", false); // ALSO POST

    private String url;
    private final boolean translate;
    RestEndpoint(String url, boolean translate) {
        this.url = url;
        this.translate = translate;
    }

    public String getURL() {
        if (this.translate) {
            ServerKeySet keySet = OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet();
            this.url = this.url.replace("_private_key_", keySet.getPrivateKey().getValue());
            this.url = this.url.replace("_public_key_", keySet.getPublicKey().getValue());
        }
        return this.url;
    }
}
