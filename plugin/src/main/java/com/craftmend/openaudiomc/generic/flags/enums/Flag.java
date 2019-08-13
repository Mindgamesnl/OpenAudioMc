package com.craftmend.openaudiomc.generic.flags.enums;

import lombok.Getter;

public enum Flag {

    VOICE_CHAT("flag_voice_chat_enabled");

    @Getter private String tag;

    Flag(String tag) {
        this.tag = tag;
    }

    public static Flag getByBackendTag(String flag) {
        for (Flag value : values()) if (value.getTag().equals(flag)) return value;
        return null;
    }
}
