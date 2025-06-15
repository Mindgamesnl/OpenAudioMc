package com.craftmend.openaudiomc.api.regions;

/**
 * Represents media options for a region, this is not a full subset of the normal media options
 */
public class RegionMediaOptions {
    /**
     * If the media should loop
     */
    private boolean loop = true;
    /**
     * If the media should be faded in and out (in milliseconds)
     */
    private int fadeTime = 500;
    /**
     * The volume of the media, 0-100
     */
    private int volume = 100;
    /**
     * The source of the media
     */
    private String source = null;

    // utility constructors
    public RegionMediaOptions(String source) {
        this.source = source;
    }

    public RegionMediaOptions(String source, int volume) {
        this.source = source;
        this.volume = volume;
    }

    public RegionMediaOptions(String source, int volume, int fadeTime) {
        this.source = source;
        this.volume = volume;
        this.fadeTime = fadeTime;
    }

    /**
     * If the media should loop
     */
    public boolean isLoop() {
        return this.loop;
    }

    /**
     * If the media should be faded in and out (in milliseconds)
     */
    public int getFadeTime() {
        return this.fadeTime;
    }

    /**
     * The volume of the media, 0-100
     */
    public int getVolume() {
        return this.volume;
    }

    /**
     * The source of the media
     */
    public String getSource() {
        return this.source;
    }

    /**
     * If the media should loop
     */
    public void setLoop(final boolean loop) {
        this.loop = loop;
    }

    /**
     * If the media should be faded in and out (in milliseconds)
     */
    public void setFadeTime(final int fadeTime) {
        this.fadeTime = fadeTime;
    }

    /**
     * The volume of the media, 0-100
     */
    public void setVolume(final int volume) {
        this.volume = volume;
    }

    /**
     * The source of the media
     */
    public void setSource(final String source) {
        this.source = source;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof RegionMediaOptions)) return false;
        final RegionMediaOptions other = (RegionMediaOptions) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isLoop() != other.isLoop()) return false;
        if (this.getFadeTime() != other.getFadeTime()) return false;
        if (this.getVolume() != other.getVolume()) return false;
        final Object this$source = this.getSource();
        final Object other$source = other.getSource();
        if (this$source == null ? other$source != null : !this$source.equals(other$source)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof RegionMediaOptions;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isLoop() ? 79 : 97);
        result = result * PRIME + this.getFadeTime();
        result = result * PRIME + this.getVolume();
        final Object $source = this.getSource();
        result = result * PRIME + ($source == null ? 43 : $source.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "RegionMediaOptions(loop=" + this.isLoop() + ", fadeTime=" + this.getFadeTime() + ", volume=" + this.getVolume() + ", source=" + this.getSource() + ")";
    }

    /**
     * Creates a new {@code RegionMediaOptions} instance.
     *
     * @param loop If the media should loop
     * @param fadeTime If the media should be faded in and out (in milliseconds)
     * @param volume The volume of the media, 0-100
     * @param source The source of the media
     */
    public RegionMediaOptions(final boolean loop, final int fadeTime, final int volume, final String source) {
        this.loop = loop;
        this.fadeTime = fadeTime;
        this.volume = volume;
        this.source = source;
    }

    public RegionMediaOptions() {
    }
}
