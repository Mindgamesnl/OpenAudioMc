package com.craftmend.openaudiomc.generic.environment;

import com.craftmend.openaudiomc.generic.platform.Platform;

import java.io.File;
import java.util.EnumMap;

/**
 * This system aims to standardize internal values and make them
 * static and accessible to external applications.
 */
public enum MagicValue {

    NOTIFY_VOICECHAT_SLOT_DEPLETION(true),
    FORCE_SERVER_NODE(false),
    FORCE_SERVER_STANDALONE(false),
    LOCATION_TRACK_INTERVAL(2),
    STORAGE_DIRECTORY(new File("./")),
    FORCED_HOOK_INJECTION(null),
    DYNAMIC_REGISTRATIONS(false),
    PARENT_PLATFORM(Platform.UNKNOWN),
    COMMAND_PREFIX("[OpenAudioMc - Magic]");

    private static final EnumMap<MagicValue, Object> tempValues = new EnumMap<>(MagicValue.class);
    private final Object value;

    <T> MagicValue(Object value) {
        this.value = value;
    }

    public <T> T get(Class<T> as) {
        // check if we have a temporary value
        if (tempValues.containsKey(this)) return as.cast(tempValues.get(this));
        return as.cast(value);
    }

    private Object type() {
        return value;
    }

    public static void loadArguments() {
        for (MagicValue value : values()) {
            if (value.type() instanceof Boolean) {
                String argV = System.getProperty("OA_" + value.name());
                if (argV != null && argV.length() > 1) {
                    overWrite(value, Boolean.valueOf(argV));
                }
            }
        }
    }

    public boolean isNull() {
        if (tempValues.get(this) != null) {
            return false;
        }
        return value == null;
    }

    public static void overWrite(MagicValue key, Object value) {
        tempValues.put(key, value);
    }

}
