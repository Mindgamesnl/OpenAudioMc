package com.craftmend.openaudiomc.modules.networking.enums;

public enum PacketChannel {

    //socket in
    SOCKET_IN_REGISTER_CLIENT,
    SOCKET_IN_UNREGISTER_CLIENT,

    //socket out
    SOCKET_OUT_KICK_CLIENT,
    SOCKET_OUT_AWKNOLEGECLIENT,

    //client target
    CLIENT_OUT_CREATE_MEDIA,
    CLIENT_OUT_TRIGGER_MEDIA,
    CLIENT_OUT_DESTROY_MEDIA

}
