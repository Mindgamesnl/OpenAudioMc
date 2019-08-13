package com.craftmend.openaudiomc.generic.flags.enums;

import lombok.Getter;

public enum Flag {

    VOICE_CHAT_16("flag_voice_chat_enabled_16"),
    VOICE_CHAT_8("flag_voice_chat_enabled_8"),
    VOICE_CHAT_2("flag_voice_chat_enabled_2");

    @Getter private String tag;

    Flag(String tag) {
        this.tag = tag;
    }

    public static Flag getByBackendTag(String flag) {
        for (Flag value : values()) if (value.getTag().equals(flag)) return value;
        return null;
    }
}
