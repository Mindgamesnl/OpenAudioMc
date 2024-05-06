package com.craftmend.openaudiomc.spigot.modules.voicechat.channels;

import com.craftmend.openaudiomc.api.channels.ChannelJoinResponse;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import lombok.Getter;

public enum ChannelEnterResponse {

    OK(StorageKey.MESSAGE_VOICE_CHANNEL_JOINED.getString(), ChannelJoinResponse.ALLOWED),
    INVITE_ONLY(StorageKey.MESSAGE_VOICE_CHANNEL_INVITE_ONLY.getString(), ChannelJoinResponse.INVITE_ONLY),
    NO_PERMISSION(StorageKey.MESSAGE_VOICE_CHANNEL_NO_PERMISSION_TO_JOIN.getString(), ChannelJoinResponse.NO_PERMISSION);

    @Getter private final String message;
    @Getter private final ChannelJoinResponse apiValue;

    ChannelEnterResponse(String message, ChannelJoinResponse apiValue) {
        this.message = message;
        this.apiValue = apiValue;
    }


}
