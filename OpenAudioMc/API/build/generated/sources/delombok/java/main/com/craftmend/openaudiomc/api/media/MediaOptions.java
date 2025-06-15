package com.craftmend.openaudiomc.api.media;

/**
 * This class is a model for media options, which are used to configure media objects.
 * Media options are used to configure the behavior of a media object, such as volume, looping, and fading.
 * These can be set on the Media object itself too, but this serves as an intermediate object to help apply serialized media options.
 */
public class MediaOptions {
    /**
     * If the media should repeat when it ends
     */
    private boolean loop = false;
    /**
     * The id of the media, this is used to identify the media
     */
    private String id;
    /**
     * Keep expirationTimeout/keepTimeout is the amount of seconds that the openaudiomc plugin runtime should keep track of this media for.
     * Used to retroactively play media if a client connected too late. optional, -1 by default to disable.
     */
    private int expirationTimeout = -1;
    /**
     * If the media should attempt to pick up where its currently according to the time spent since the start instant.
     */
    private boolean pickUp = true;
    /**
     * Fade time is the amount of milliseconds it takes to fade in or out. 0 by default, but can be used to create smooth transitions
     * between multiple regions, or to create a fade in effect.
     */
    private int fadeTime = 0;
    /**
     * The volume of the media, 0-100
     */
    private int volume = 100;
    /**
     * If this media will mute current regions while playing. This is used to prevent overlapping media in regions.
     */
    private boolean muteSpeakers = false;
    /**
     * If this media will mute the speakers of the client. This is used to prevent overlapping media with speakers.
     */
    private boolean muteRegions = false;
    /**
     * The starting point of the media, in milliseconds. 0 by default, but can be used to skip intros or start at a certain point.
     */
    private int startAtMillis = 0;

    /**
     * validation rules for the media options
     * @return a validation result
     */
    public OptionalError validate() {
        if (volume > 100) return new OptionalError(true, "Volume may not be over 100");
        if (volume < 0) return new OptionalError(true, "Volume may not be lower than 0");
        if (volume == 0) return new OptionalError(true, "You shouldn\'t even play it if the volume is 0");
        if (fadeTime < 0) return new OptionalError(true, "Fade time can\'t be negative");
        return new OptionalError(false, "");
    }

    /**
     * If the media should repeat when it ends
     */
    public boolean isLoop() {
        return this.loop;
    }

    /**
     * The id of the media, this is used to identify the media
     */
    public String getId() {
        return this.id;
    }

    /**
     * Keep expirationTimeout/keepTimeout is the amount of seconds that the openaudiomc plugin runtime should keep track of this media for.
     * Used to retroactively play media if a client connected too late. optional, -1 by default to disable.
     */
    public int getExpirationTimeout() {
        return this.expirationTimeout;
    }

    /**
     * If the media should attempt to pick up where its currently according to the time spent since the start instant.
     */
    public boolean isPickUp() {
        return this.pickUp;
    }

    /**
     * Fade time is the amount of milliseconds it takes to fade in or out. 0 by default, but can be used to create smooth transitions
     * between multiple regions, or to create a fade in effect.
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
     * If this media will mute current regions while playing. This is used to prevent overlapping media in regions.
     */
    public boolean isMuteSpeakers() {
        return this.muteSpeakers;
    }

    /**
     * If this media will mute the speakers of the client. This is used to prevent overlapping media with speakers.
     */
    public boolean isMuteRegions() {
        return this.muteRegions;
    }

    /**
     * The starting point of the media, in milliseconds. 0 by default, but can be used to skip intros or start at a certain point.
     */
    public int getStartAtMillis() {
        return this.startAtMillis;
    }

    /**
     * If the media should repeat when it ends
     */
    public void setLoop(final boolean loop) {
        this.loop = loop;
    }

    /**
     * The id of the media, this is used to identify the media
     */
    public void setId(final String id) {
        this.id = id;
    }

    /**
     * Keep expirationTimeout/keepTimeout is the amount of seconds that the openaudiomc plugin runtime should keep track of this media for.
     * Used to retroactively play media if a client connected too late. optional, -1 by default to disable.
     */
    public void setExpirationTimeout(final int expirationTimeout) {
        this.expirationTimeout = expirationTimeout;
    }

    /**
     * If the media should attempt to pick up where its currently according to the time spent since the start instant.
     */
    public void setPickUp(final boolean pickUp) {
        this.pickUp = pickUp;
    }

    /**
     * Fade time is the amount of milliseconds it takes to fade in or out. 0 by default, but can be used to create smooth transitions
     * between multiple regions, or to create a fade in effect.
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
     * If this media will mute current regions while playing. This is used to prevent overlapping media in regions.
     */
    public void setMuteSpeakers(final boolean muteSpeakers) {
        this.muteSpeakers = muteSpeakers;
    }

    /**
     * If this media will mute the speakers of the client. This is used to prevent overlapping media with speakers.
     */
    public void setMuteRegions(final boolean muteRegions) {
        this.muteRegions = muteRegions;
    }

    /**
     * The starting point of the media, in milliseconds. 0 by default, but can be used to skip intros or start at a certain point.
     */
    public void setStartAtMillis(final int startAtMillis) {
        this.startAtMillis = startAtMillis;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof MediaOptions)) return false;
        final MediaOptions other = (MediaOptions) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isLoop() != other.isLoop()) return false;
        if (this.getExpirationTimeout() != other.getExpirationTimeout()) return false;
        if (this.isPickUp() != other.isPickUp()) return false;
        if (this.getFadeTime() != other.getFadeTime()) return false;
        if (this.getVolume() != other.getVolume()) return false;
        if (this.isMuteSpeakers() != other.isMuteSpeakers()) return false;
        if (this.isMuteRegions() != other.isMuteRegions()) return false;
        if (this.getStartAtMillis() != other.getStartAtMillis()) return false;
        final Object this$id = this.getId();
        final Object other$id = other.getId();
        if (this$id == null ? other$id != null : !this$id.equals(other$id)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof MediaOptions;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isLoop() ? 79 : 97);
        result = result * PRIME + this.getExpirationTimeout();
        result = result * PRIME + (this.isPickUp() ? 79 : 97);
        result = result * PRIME + this.getFadeTime();
        result = result * PRIME + this.getVolume();
        result = result * PRIME + (this.isMuteSpeakers() ? 79 : 97);
        result = result * PRIME + (this.isMuteRegions() ? 79 : 97);
        result = result * PRIME + this.getStartAtMillis();
        final Object $id = this.getId();
        result = result * PRIME + ($id == null ? 43 : $id.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "MediaOptions(loop=" + this.isLoop() + ", id=" + this.getId() + ", expirationTimeout=" + this.getExpirationTimeout() + ", pickUp=" + this.isPickUp() + ", fadeTime=" + this.getFadeTime() + ", volume=" + this.getVolume() + ", muteSpeakers=" + this.isMuteSpeakers() + ", muteRegions=" + this.isMuteRegions() + ", startAtMillis=" + this.getStartAtMillis() + ")";
    }

    public MediaOptions() {
    }
}
