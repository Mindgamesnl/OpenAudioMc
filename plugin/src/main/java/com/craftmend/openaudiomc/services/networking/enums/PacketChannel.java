package com.craftmend.openaudiomc.services.networking.enums;

public enum PacketChannel {

    //socket in
    SOCKET_IN_REGISTER_CLIENT,
    SOCKET_IN_UNREGISTER_CLIENT,

    //socket out
    SOCKET_OUT_KICK_CLIENT,
    SOCKET_OUT_ACKNOWLEDGEMENT,

    //client target
    CLIENT_OUT_CREATE_MEDIA,
    CLIENT_OUT_UPDATE_MEDIA,
    CLIENT_OUT_DESTROY_MEDIA,
    CLIENT_OUT_SET_HUE

}
