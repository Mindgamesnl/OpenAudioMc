package com.craftmend.openaudiomc.generic.rest.routes;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.rest.ServerEnvironment;

public enum Endpoint {

    // accounts
    GET_ACCOUNT_SETTINGS("https://account.openaudiomc.net", "/api/v1/installation/settings/_public_key_", true),
    REGISTER("https://account.openaudiomc.net", "/api/v1/installation/register", false),
    RELAY_LOGIN("https://gateway.openaudiomc.net", "/api/v1/installation/login-relay/_public_key_/_private_key_", true),
    RELAY_LOGOUT("https://gateway.openaudiomc.net", "/api/v1/installation/logout-relay/_public_key_/_private_key_", true),
    CLAIM_CODE("https://account.openaudiomc.net", "/api/v1/installation/claim-code/_public_key_/_private_key_", true),

    // services
    CREATE_SESSION_TOKEN("https://gateway.openaudiomc.net", "/session", false, false),
    ACTIVATE_SESSION_TOKEN("https://gateway.openaudiomc.net", "/session/activate", false, false),
    DIRECT_REST("https://gateway.openaudiomc.net", "/direct-rest", false, false),

    // voice
    VOICE_PREFLIGHT_CHECK("", "/eb/check", false),
    VOICE_BUS("", "/eb/ws", false, false),
    VOICE_REQUEST_PASSWORD("https://account.openaudiomc.net", "/api/v1/installation/login-voice/_public_key_/_private_key_", true),
    VOICE_INVALIDATE_PASSWORD("https://account.openaudiomc.net", "/api/v1/installation/logout-voice/_public_key_/_private_key_", true),

    // loopback
    LOOPBACK_CHECK("", "/api/validate", false, false),

    // external
    GITHUB_VERSION_CHECK("https://raw.githubusercontent.com", "/Mindgamesnl/OpenAudioMc/master/plugin/protocol/static-resources/project_status.json", false, false),
    ;

    private String baseUrl;
    private String path;
    private boolean replaceTokens;
    private boolean debuggable;
    Endpoint(String baseUrl, String path, boolean replaceTokens, boolean debuggable) {
        this.baseUrl = baseUrl;
        this.path = path;
        this.replaceTokens = replaceTokens;
        this.debuggable = debuggable;
    }

    Endpoint(String baseUrl, String path, boolean replaceTokens) {
        this(baseUrl, path, replaceTokens, true);
    }

    public String getURL(String burl) {
        if (burl == null) {
            burl = this.baseUrl;

            // possibly overwrite the base url for debug
            if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.DEVELOPMENT && this.debuggable) {
                // do we have a debug url?
                String debugUrl = MagicValue.readEnv("OA_DEBUG_URL");
                if (debugUrl != null) {
                    burl = debugUrl;
                }
            }
        }
        String url = burl + path;
        if (this.replaceTokens) {
            ServerKeySet keySet = OpenAudioMc.getService(AuthenticationService.class).getServerKeySet();
            url = url.replace("_private_key_", keySet.getPrivateKey().getValue());
            url = url.replace("_public_key_", keySet.getPublicKey().getValue());
        }
        return url;
    }

}
