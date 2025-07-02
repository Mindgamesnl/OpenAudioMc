package com.craftmend.openaudiomc.generic.utils;

import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.api.user.User;

public class BedrockUtil {

    public static boolean isGeyser(User<?> user) {
        // It should be save to assume that the configuration provider is loaded for the platform
        // whenever we interact with a user. If it isn't, we have a bigger problem.
        return user.getName().startsWith(StorageKey.SETTINGS_BEDROCK_PREFIX.getString())
                || user.getUniqueId().getMostSignificantBits() == 0; // From https://github.com/GeyserMC/Floodgate/blob/227858930d98dc8e89054b38edebc3b432c0a5eb/core/src/main/java/org/geysermc/floodgate/api/SimpleFloodgateApi.java#L115C21-L115C43
    }

}
