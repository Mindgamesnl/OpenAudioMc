package com.craftmend.openaudiomc.api.voice;

import org.jetbrains.annotations.Nullable;
import java.util.UUID;

/**
 * This class is used to override the display name of a player in the voice chat system.
 * This is useful for when you want to display a different name than the player's actual name,
 * to add compatibility for bedrock players or display game ranks.
 * @since 6.10.2
 */
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

    public DisplayOverride() {
    }

    /**
     * The name that should be displayed in the voice chat system.
     * MUST be 32 characters or less.
     */
    @Nullable
    public String getName() {
        return this.name;
    }

    /**
     * The new UUID that should be used to obtain skin data.
     */
    @Nullable
    public UUID getDisplayUuid() {
        return this.displayUuid;
    }

    /**
     * The name that should be displayed in the voice chat system.
     * MUST be 32 characters or less.
     */
    public void setName(@Nullable final String name) {
        this.name = name;
    }

    /**
     * The new UUID that should be used to obtain skin data.
     */
    public void setDisplayUuid(@Nullable final UUID displayUuid) {
        this.displayUuid = displayUuid;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof DisplayOverride)) return false;
        final DisplayOverride other = (DisplayOverride) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$name = this.getName();
        final Object other$name = other.getName();
        if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
        final Object this$displayUuid = this.getDisplayUuid();
        final Object other$displayUuid = other.getDisplayUuid();
        if (this$displayUuid == null ? other$displayUuid != null : !this$displayUuid.equals(other$displayUuid)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof DisplayOverride;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $name = this.getName();
        result = result * PRIME + ($name == null ? 43 : $name.hashCode());
        final Object $displayUuid = this.getDisplayUuid();
        result = result * PRIME + ($displayUuid == null ? 43 : $displayUuid.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "DisplayOverride(name=" + this.getName() + ", displayUuid=" + this.getDisplayUuid() + ")";
    }
}
