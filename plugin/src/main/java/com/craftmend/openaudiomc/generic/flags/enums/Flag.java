package com.craftmend.openaudiomc.generic.flags.enums;

import lombok.Getter;

public enum OptionalModule {

    VOICE_CHAT("flag_voice_chat_enabled");

    @Getter private String flag;

    OptionalModule(String flag) {
        this.flag = flag;
    }

    public static O
}
