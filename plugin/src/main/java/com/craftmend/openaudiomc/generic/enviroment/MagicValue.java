package com.craftmend.openaudiomc.generic.enviroment;

import java.io.File;
import java.util.EnumMap;

/**
 * This system aims to standardize internal values and make them
 * static and accessible to external applications.
 */
public enum MagicValue {

    NOTIFY_VOICECHAT_SLOT_DEPLETION(true),
    LOCATION_TRACK_INTERVAL(2),
    STORAGE_DIRECTORY(new File("./")),
    COMMAND_PREFIX("[OpenAudioMc - Magic]");

    private static EnumMap<MagicValue, Object> tempValues = new EnumMap<>(MagicValue.class);
    private Object value;

    <T> MagicValue(Object value) {
        this.value = value;
    }

    public <T> T get(Class<T> as) {
        // check if we have a temporary value
        if (tempValues.containsKey(this)) return as.cast(tempValues.get(this));
        return as.cast(value);
    }

    public static void overWrite(MagicValue key, Object value) {
        tempValues.put(key, value);
    }

}
