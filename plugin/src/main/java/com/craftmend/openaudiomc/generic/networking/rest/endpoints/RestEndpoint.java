package com.craftmend.openaudiomc.generic.networking.rest.endpoints;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;

public enum RestEndpoint {

    // EXTERNAL SOURCES
    GITHUB_VERSION_CHECK("https://raw.githubusercontent.com/Mindgamesnl/OpenAudioMc/master/plugin/protocol/static-resources/project_status.json", false),

    // OPENAUDIOMC REST API'S
    PLUS_REGISTER("https://plus.openaudiomc.net/api/v1/servers/register", false),                     // GET
    PLUS_LOGIN("https://plus.openaudiomc.net/api/v1/servers/login/_private_key_", true),              // GET
    PLUS_LOGOUT("https://plus.openaudiomc.net/api/v1/servers/logout/_private_key_", true),            // GET
    PLUS_GEN_SESSION("https://plus.openaudiomc.net/api/v1/servers/createlogin", false),       // POST
    PLUS_GET_SETTINGS("https://plus.openaudiomc.net/api/v1/public/settings/_public_key_", true), // GET
    PLUS_PUSH_LEGACY_SETTINGS("https://plus.openaudiomc.net/api/v1/plus/settings", false),              // POST
    PLUS_UPDATE_PLAYERS("https://plus.openaudiomc.net/api/v1/plus/players", false),              // ALSO POST

    // SERVERLESS API'S
    WORKER_SHOWS_UPLOAD("https://plus.openaudiomc.net/worker-proxy/shows/upload", false),                 // POST SHOW-DATA AND AUTH


    // VOICE SHIT
    VOICE_CREATE_ROOM("https://plus.openaudiomc.net/api/v1/servers/create-voice/_private_key_", true),                   // GET
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
