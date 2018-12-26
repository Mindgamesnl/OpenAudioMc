package com.craftmend.openaudiomc.modules.networking.enums;

import lombok.Getter;

public enum PacketType {

    //received from socket
    SERVER_CLIENT_WEB_CONNECT("client_connected_web", PacketTarget.SERVER),
    SERVER_CLIENT_WEB_DISCONNECT("client_disconnected_web", PacketTarget.SERVER),

    //send over socket
    SOCKET_PLAYER_JOIN_SERVER("player_join_server", PacketTarget.SOCKET),
    SOCKET_PLAYER_LEAVE_SERVER("player_leave_server", PacketTarget.SOCKET),
    SOCKET_KICK_CLIENT("kick_client", PacketTarget.SOCKET),

    //send to client
    CLIENT_CREATE_MEDIA("create_media", PacketTarget.CLIENT),
    CLIENT_PLAY_MEDIA("play_media", PacketTarget.CLIENT),
    CLIENT_DESTROY_MEDIA("destroy_media", PacketTarget.CLIENT),
    CLIENT_UPDATE_MEDIA_TIME("update_media_time", PacketTarget.CLIENT),
    CLIENT_UPDATE_MEDIA_VOLUME("update_media_volume", PacketTarget.CLIENT);


    @Getter private String channel;
    @Getter private PacketTarget target;

    PacketType(String channel, PacketTarget target) {
        this.channel = channel;
        this.target = target;
    }
}
