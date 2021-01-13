package com.craftmend.openaudiomc.generic.networking.rest.endpoints;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;

public enum RestEndpoint {

    // modern cloud API's
    GET_HOST_DETAILS("https://cloud.openaudiomc.net/api/v2/ip", false),
    PLUS_LOGIN("https://cloud.openaudiomc.net/api/v2/plugin/login/_private_key_", true),
    CHECK_ACCOUNT_HEALTH("https://cloud.openaudiomc.net/api/v2/account-services/server/check/_public_key_", true),
    PLUS_GET_SETTINGS("https://cloud.openaudiomc.net/api/v2/account-services/settings/_public_key_", true),
    CREATE_SESSION_TOKEN("https://cloud.openaudiomc.net/session", false),
    CREATE_HOST_TOKEN("https://cloud.openaudiomc.net/identity", false),

    // external calls
    GITHUB_VERSION_CHECK("https://raw.githubusercontent.com/Mindgamesnl/OpenAudioMc/master/plugin/protocol/static-resources/project_status.json", false),

    // plus
    PLUS_REGISTER("https://plus.openaudiomc.net/api/v1/servers/register", false),
    PLUS_LOGOUT("https://plus.openaudiomc.net/api/v1/servers/logout/_private_key_", true),
    PLUS_GEN_SESSION("https://plus.openaudiomc.net/api/v1/servers/createlogin", false),
    PLUS_PUSH_LEGACY_SETTINGS("https://plus.openaudiomc.net/api/v1/plus/settings", false),
    PLUS_UPDATE_PLAYERS("https://plus.openaudiomc.net/api/v1/plus/players", false),
    WORKER_SHOWS_UPLOAD("https://plus.openaudiomc.net/worker-proxy/shows/upload", false),

    // voice
    VOICE_LOGIN("/driver/login", false)
    ;

    private String url;
    private final boolean translate;

    RestEndpoint(String url, boolean translate) {
        this.url = url;
        this.translate = translate;
    }

    public RestEndpoint setHost(String hostname) {
        if (this.url.startsWith("/")) {
            this.url = url.replace("/", "");
        }

        if (!hostname.endsWith("/")) {
            hostname = hostname += "/";
        }

        this.url = hostname + this.url;
        return this;
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
