package com.craftmend.openaudiomc.generic.networking.rest.data;

public enum RestErrorType {

    INVALID_LOGIN,      // load balancer declined the request due to authentication
    NO_VOICE_SERVER,    // there is no server to handle your request (out of resources, please donate lol)
    NO_RELAY,           // there is no relay to handle your request (out of resources, please donate lol)
    NO_AUTH,            // bad authentication, or none at all
    NO_ACCOUNT,         // account does not match specification or was empty
    FEATURE_RESTRICTED, // this account is not allowed to use this feature (yet)
    NO_ROOM,            // room does not exist or does not match the provided api key
    BAD_REQUEST,        // other essential data was nil or empty
    ROOM_TOO_BIG,       // mutation will overwrite room size and got declined
    INVALID_ARGUMENT,   // I just don't understand what you mean
    INVALID_DATA,       // I understand what you mean, but no
    WTF,                // I don't know what, it just happened and exploded right in your face
    SERVER_OFFLINE,     // The server you tried to interact with is not registered

}
