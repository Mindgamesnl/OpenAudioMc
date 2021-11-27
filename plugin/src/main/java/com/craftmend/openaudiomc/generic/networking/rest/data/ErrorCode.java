package com.craftmend.openaudiomc.generic.networking.rest.data;

public enum ErrorCode {

    // GENERAL REST
    INVALID_LOGIN,      // load balancer declined the request due to authentication
    NO_VOICE_SERVER,    // there is no server to handle your request (out of resources, please donate lol)
    NO_RELAY,           // there is no relay to handle your request (out of resources, please donate lol)
    NO_AUTH,            // bad authentication, or none at all
    NO_ACCOUNT,         // account does not match specification or was empty
    FEATURE_RESTRICTED, // this account is not allowed to use this feature (yet)
    BAD_REQUEST,        // other essential data was nil or empty
    INVALID_ARGUMENT,   // I just don't understand what you mean
    INVALID_DATA,       // I understand what you mean, but no
    WTF,                // I don't know what, it just happened and exploded right in your face
    SERVER_OFFLINE,     // The server you tried to interact with is not registered
    SERVER_BANNED,      // Server has been banned due to TOS, client url setting contains a URL to the ban page with details
    REQUEST_TOO_BIG,    // The request (probably post body) is too big to be handled (likely due to cloudflare caching rules)

    // VOICE
    BAD_HANDSHAKE,      // I don't know what you are. I don't know who you are. But I want you gone.
    NO_RTC,             // Failed to allocate one or more RTC sessions

    // INTERNAL
    SYS_IDLE,           // this action cannot be fulfilled when openaudiomc is in its idle state

    NO_PERMISSIONS,     // you can't do this because of permissions
    ALREADY_ACTIVE,     // invalid account state

    PLACEHOLDER, // default

}
