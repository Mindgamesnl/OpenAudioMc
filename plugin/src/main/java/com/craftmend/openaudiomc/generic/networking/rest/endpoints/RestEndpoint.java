package com.craftmend.openaudiomc.generic.networking.rest.endpoints;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;

public enum RestEndpoint {

    // modern cloud API's
    GET_HOST_DETAILS("https://cloud.openaudiomc.net/api/v2/ip", false),
    CHECK_ACCOUNT_HEALTH("https://cloud.openaudiomc.net/api/v2/account-services/server/check/_public_key_", true),
    CREATE_SESSION_TOKEN("https://cloud.openaudiomc.net/session", false),
    CREATE_HOST_TOKEN("https://cloud.openaudiomc.net/identity", false),

    // external calls
    GITHUB_VERSION_CHECK("https://raw.githubusercontent.com/Mindgamesnl/OpenAudioMc/master/plugin/protocol/static-resources/project_status.json", false),

    // account
    ACCOUNT_CLAIM_SERVER("https://account.craftmend.com/api/v1/public/openaudiomc/claim/_public_key_/_private_key_", true),
    ACCOUNT_UPDATE_PLAYERS("https://account.craftmend.com/api/v1/public/openaudiomc/online-players", false),
    GET_ACCOUNT_STATE("https://account.craftmend.com/api/v1/public/openaudiomc/settings/_public_key_", true),
    ACCOUNT_HANDLE_LOGOUT("https://account.craftmend.com/api/v1/public/openaudiomc/logout/_private_key_", true),

    // login requests a relay and registers it
    PLUS_LOGIN("https://cloud.openaudiomc.net/api/v2/plugin/login/_private_key_", true),

    // plus
    PLUS_REGISTER("https://plus.openaudiomc.net/api/v1/servers/register", false),
    PLUS_PUSH_LEGACY_SETTINGS("https://plus.openaudiomc.net/api/v1/plus/settings", false),

    // voice
    VOICE_LOGIN("/openaudio/login", false),
    VOICE_EVENTS("/openaudio/events", false),
    ;

    private String url;
    private final boolean translate;

    RestEndpoint(String url, boolean translate) {
        this.url = url;
        this.translate = translate;
    }

    public RestEndpoint setHost(String hostname) {
        if (this.url.contains(hostname)) return this;
        if (this.url.startsWith("/")) {
            this.url = url.replaceFirst("/", "");
        }

        if (!hostname.endsWith("/")) {
            hostname += "/";
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
