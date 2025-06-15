package com.craftmend.openaudiomc.api.voice;

import org.jetbrains.annotations.Nullable;

/**
 * Voice chat options are special flags set for each peer, giving the client extra information on how the connection
 * should be treated and rendered. The initial state is defined by the default values in this class, and get passed during
 * the connection request packet sent towards the client. These settings can also be changed on the fly, by pushing them
 * in a separate client options update packet without needing the session to reload.
 */
public class VoicePeerOptions implements Cloneable {
    /**
     * Singleton default. Means we don't have to create a new object every time we want to use the default.
     */
    public static final VoicePeerOptions DEFAULT = new VoicePeerOptions();
    /**
     * Weather or not the peer should be visible in the web UI.
     * The client will still setup a voice stream to the peer if set to false, but completely
     * hide the person's name/uuid from the web UI.
     * This can be used for example to hide an opponent in a game, while still letting them hear each other.
     */
    private boolean visible = true;
    /**
     * This flag decides if the stream should be rendered as a spatial stream. This also requires the client to receive
     * location updates every few ticks. Setting it to false just renders it as a normal mono stream (think discord/teamspeak).
     * The icon next to someone's name also gets controlled by this flag.
     */
    private boolean spatialAudio = true;
    /**
     * An optional display override, which can be used to change the display name and skin of a player in the voice chat system.
     * This can be left null if no override is needed.
     * @since 6.10.2
     */
    @Nullable
    private DisplayOverride displayOverride;

    /**
     * Clone the object
     * @return a clone of the object
     */
    @Override
    public VoicePeerOptions clone() {
        return new VoicePeerOptions(visible, spatialAudio, null);
    }

    /**
     * Weather or not the peer should be visible in the web UI.
     * The client will still setup a voice stream to the peer if set to false, but completely
     * hide the person's name/uuid from the web UI.
     * This can be used for example to hide an opponent in a game, while still letting them hear each other.
     */
    public boolean isVisible() {
        return this.visible;
    }

    /**
     * This flag decides if the stream should be rendered as a spatial stream. This also requires the client to receive
     * location updates every few ticks. Setting it to false just renders it as a normal mono stream (think discord/teamspeak).
     * The icon next to someone's name also gets controlled by this flag.
     */
    public boolean isSpatialAudio() {
        return this.spatialAudio;
    }

    /**
     * An optional display override, which can be used to change the display name and skin of a player in the voice chat system.
     * This can be left null if no override is needed.
     * @since 6.10.2
     */
    @Nullable
    public DisplayOverride getDisplayOverride() {
        return this.displayOverride;
    }

    /**
     * Weather or not the peer should be visible in the web UI.
     * The client will still setup a voice stream to the peer if set to false, but completely
     * hide the person's name/uuid from the web UI.
     * This can be used for example to hide an opponent in a game, while still letting them hear each other.
     */
    public void setVisible(final boolean visible) {
        this.visible = visible;
    }

    /**
     * This flag decides if the stream should be rendered as a spatial stream. This also requires the client to receive
     * location updates every few ticks. Setting it to false just renders it as a normal mono stream (think discord/teamspeak).
     * The icon next to someone's name also gets controlled by this flag.
     */
    public void setSpatialAudio(final boolean spatialAudio) {
        this.spatialAudio = spatialAudio;
    }

    /**
     * An optional display override, which can be used to change the display name and skin of a player in the voice chat system.
     * This can be left null if no override is needed.
     * @since 6.10.2
     */
    public void setDisplayOverride(@Nullable final DisplayOverride displayOverride) {
        this.displayOverride = displayOverride;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof VoicePeerOptions)) return false;
        final VoicePeerOptions other = (VoicePeerOptions) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isVisible() != other.isVisible()) return false;
        if (this.isSpatialAudio() != other.isSpatialAudio()) return false;
        final Object this$displayOverride = this.getDisplayOverride();
        final Object other$displayOverride = other.getDisplayOverride();
        if (this$displayOverride == null ? other$displayOverride != null : !this$displayOverride.equals(other$displayOverride)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof VoicePeerOptions;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isVisible() ? 79 : 97);
        result = result * PRIME + (this.isSpatialAudio() ? 79 : 97);
        final Object $displayOverride = this.getDisplayOverride();
        result = result * PRIME + ($displayOverride == null ? 43 : $displayOverride.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "VoicePeerOptions(visible=" + this.isVisible() + ", spatialAudio=" + this.isSpatialAudio() + ", displayOverride=" + this.getDisplayOverride() + ")";
    }

    public VoicePeerOptions() {
    }

    /**
     * Creates a new {@code VoicePeerOptions} instance.
     *
     * @param visible Weather or not the peer should be visible in the web UI.
     * The client will still setup a voice stream to the peer if set to false, but completely
     * hide the person's name/uuid from the web UI.
     * This can be used for example to hide an opponent in a game, while still letting them hear each other.
     * @param spatialAudio This flag decides if the stream should be rendered as a spatial stream. This also requires the client to receive
     * location updates every few ticks. Setting it to false just renders it as a normal mono stream (think discord/teamspeak).
     * The icon next to someone's name also gets controlled by this flag.
     * @param displayOverride An optional display override, which can be used to change the display name and skin of a player in the voice chat system.
     * This can be left null if no override is needed.
     * @since 6.10.2
     */
    public VoicePeerOptions(final boolean visible, final boolean spatialAudio, @Nullable final DisplayOverride displayOverride) {
        this.visible = visible;
        this.spatialAudio = spatialAudio;
        this.displayOverride = displayOverride;
    }
}
