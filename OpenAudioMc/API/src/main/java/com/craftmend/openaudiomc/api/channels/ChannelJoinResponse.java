package com.craftmend.openaudiomc.api.channels;

public enum ChannelJoinResponse {

    /**
     * The client is allowed to join the channel
     */
    ALLOWED,

    /**
     * The client is only allowed to join this channel if they are invited
     */
    INVITE_ONLY,

    /**
     * The client is not allowed to join this channel
     */
    NO_PERMISSION,
}
