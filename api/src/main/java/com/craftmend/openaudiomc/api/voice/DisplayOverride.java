package com.craftmend.openaudiomc.api.voice;

import lombok.Data;
import org.jetbrains.annotations.Nullable;

import java.util.UUID;

/**
 * This class is used to override the display name of a player in the voice chat system.
 * This is useful for when you want to display a different name than the player's actual name,
 * to add compatibility for bedrock players or display game ranks.
 * @since 6.10.2
 */
@Data
public class DisplayOverride {

    /**
     * The name that should be displayed in the voice chat system.
     * MUST be 32 characters or less.
     */
    @Nullable
    private String name;

    /**
     * The new UUID that should be used to obtain skin data.
     */
    @Nullable
    private UUID displayUuid;

}
