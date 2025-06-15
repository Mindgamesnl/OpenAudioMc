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
    PLATFORM_FORCE_LATE_FIND(false),
    FORCE_DISABLE_CLIENT_NET_LOOKUP(false),
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

    public static void loadArguments() {
        for (MagicValue value : values()) {
            if (value.value instanceof Boolean) {
                String argV = readEnv("OA_" + value.name());
                if (argV != null && argV.length() > 1) {
                    System.out.println("Overwriting value " + value + " from sys args to " + Boolean.valueOf(argV));
                    overWrite(value, Boolean.valueOf(argV));
                }
            }
        }
    }

    public static String readEnv(String e) {
        String data = System.getenv(e);
        if (data == null || data.length() < 1) {
            data = System.getProperty(e);
        }
        return data;
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
