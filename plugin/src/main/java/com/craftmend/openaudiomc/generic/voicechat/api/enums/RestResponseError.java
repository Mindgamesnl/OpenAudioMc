package com.craftmend.openaudiomc.generic.voicechat.api.enums;

public enum RestResponseError {

    INVALID_LOGIN,      // load balancer declined the request due to authentication
    NO_VOICE_SERVER,    // there is no server to handle your request (out of resources, please donate lol)
    NO_AUTH,            // bad authentication, or none at all
    NO_ACCOUNT,         // account does not match specification or was empty
    FEATURE_RESTRICTED, // this account is not allowed to use this feature (yet)
    NO_ROOM,            // room does not exist or does not match the provided api key
    BAD_REQUEST,        // other essential data was nil or empty
    ROOM_TOO_BIG,       // mutation will overwrite room size and got declined

}
