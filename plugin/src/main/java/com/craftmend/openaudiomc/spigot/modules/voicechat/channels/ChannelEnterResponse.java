package com.craftmend.openaudiomc.spigot.modules.voicechat.channels;

import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import lombok.Getter;

public enum ChannelEnterResponse {

    OK(StorageKey.MESSAGE_VOICE_CHANNEL_JOINED.getString()),
    INVITE_ONLY(StorageKey.MESSAGE_VOICE_CHANNEL_INVITE_ONLY.getString()),
    NO_PERMISSION(StorageKey.MESSAGE_VOICE_CHANNEL_NO_PERMISSION_TO_JOIN.getString());

    @Getter private final String message;

    ChannelEnterResponse(String message) {
        this.message = message;
    }


}
