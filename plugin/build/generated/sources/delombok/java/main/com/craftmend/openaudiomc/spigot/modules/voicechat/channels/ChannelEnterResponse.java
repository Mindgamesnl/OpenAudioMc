package com.craftmend.openaudiomc.spigot.modules.voicechat.channels;

import com.craftmend.openaudiomc.api.channels.ChannelJoinResponse;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;

public enum ChannelEnterResponse {
    OK(StorageKey.MESSAGE_VOICE_CHANNEL_JOINED.getString(), ChannelJoinResponse.ALLOWED), INVITE_ONLY(StorageKey.MESSAGE_VOICE_CHANNEL_INVITE_ONLY.getString(), ChannelJoinResponse.INVITE_ONLY), NO_PERMISSION(StorageKey.MESSAGE_VOICE_CHANNEL_NO_PERMISSION_TO_JOIN.getString(), ChannelJoinResponse.NO_PERMISSION);
    private final String message;
    private final ChannelJoinResponse apiValue;

    ChannelEnterResponse(String message, ChannelJoinResponse apiValue) {
        this.message = message;
        this.apiValue = apiValue;
    }

    public String getMessage() {
        return this.message;
    }

    public ChannelJoinResponse getApiValue() {
        return this.apiValue;
    }
}
