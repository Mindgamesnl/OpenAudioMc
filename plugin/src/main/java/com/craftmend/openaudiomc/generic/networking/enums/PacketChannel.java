package com.craftmend.openaudiomc.generic.networking.enums;

public enum PacketChannel {

    /**
     * All the channel names that are used in communication
     *
     * SOCKET_IN is what the plugin receives via the client
     * SOCKET_OUT is what is send to the socket to proxy to the client
     */

    // socket in, so received by the minecraft server
    SOCKET_IN_REGISTER_CLIENT,
    SOCKET_IN_UNREGISTER_CLIENT,

    // socket out, so received by the socket and send from the minecraft server
    SOCKET_OUT_KICK_CLIENT,
    SOCKET_OUT_ACKNOWLEDGEMENT,

    // client target, targeted to the client
    CLIENT_OUT_CREATE_MEDIA,
    CLIENT_OUT_UPDATE_MEDIA,
    CLIENT_OUT_DESTROY_MEDIA,
    CLIENT_OUT_PUSH_NOTIFICATION,
    CLIENT_OUT_SET_VOLUME,
    CLIENT_OUT_SET_HUE,
    CLIENT_OUT_DESTROY_CARD,
    CLIENT_OUT_CREATE_CARD,
    CLIENT_OUT_UPDATE_CARD

}
