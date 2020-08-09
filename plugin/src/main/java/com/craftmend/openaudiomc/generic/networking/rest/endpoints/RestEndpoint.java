package com.craftmend.openaudiomc.generic.networking.rest.endpoints;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;

public enum RestEndpoint {

    GITHUB_VERSION_CHECK("https://raw.githubusercontent.com/Mindgamesnl/OpenAudioMc/master/plugin/protocol/static-resources/project_status.json", false),
    PLUS_REGISTER("https://plus.openaudiomc.net/api/v1/servers/register", false),
    PLUS_LOGIN("https://plus.openaudiomc.net/api/v1/servers/login/_private_key_", true),
    PLUS_LOGOUT("https://plus.openaudiomc.net/api/v1/servers/logout/_private_key_", true),
    PLUS_GEN_SESSION("https://plus.openaudiomc.net/api/v1/servers/createlogin", false),
    PLUS_GET_SETTINGS("https://cloud.openaudiomc.net/api/v2/account-services/settings/_public_key_", true),
    PLUS_PUSH_LEGACY_SETTINGS("https://plus.openaudiomc.net/api/v1/plus/settings", false),
    PLUS_UPDATE_PLAYERS("https://plus.openaudiomc.net/api/v1/plus/players", false),
    WORKER_SHOWS_UPLOAD("https://plus.openaudiomc.net/worker-proxy/shows/upload", false),
    WORKERS_CREATE_SESSION("https://plus.openaudiomc.net/session", false),
    VOICE_CREATE_ROOM("https://plus.openaudiomc.net/api/v1/servers/create-voice/_private_key_", true),
    ;

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
