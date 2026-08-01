package com.craftmend.openaudiomc.generic.text;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;

public enum MessageFormat {

    AUTO,
    LEGACY,
    MINIMESSAGE;

    public static MessageFormat configured() {
        if (OpenAudioMc.getInstance() == null || OpenAudioMc.getInstance().getConfiguration() == null) {
            return AUTO;
        }

        return parse(StorageKey.SETTINGS_MESSAGE_FORMAT.getString());
    }

    static MessageFormat parse(String value) {
        if (value == null) {
            return AUTO;
        }

        for (MessageFormat format : values()) {
            if (format.name().equalsIgnoreCase(value.trim())) {
                return format;
            }
        }
        return AUTO;
    }

}
