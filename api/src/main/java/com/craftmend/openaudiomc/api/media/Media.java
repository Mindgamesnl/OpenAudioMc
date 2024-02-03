package com.craftmend.openaudiomc.api.media;

public interface Media {

    /**
     * The unique id of the media, used by the client to keep track of media pools.
     * This is a random UUID by default, but can be set to a custom value and will be used to identify the media
     * for regions, stop commands and other features.
     *
     * @return the unique id of the media
     */
    String getMediaId();

    /**
     * Source value for the media. Typically, a web compatible web link or translatable OA value
     *
     * @return the source of the media
     */
    String getSource();

    /**
     * The volume of the media, 0-100
     *
     * @return the volume of the media
     */
    int getVolume();

    /**
     * An epoch millisecond timestamp of when the media started playing, used by the client to calculate the current position
     * if keepup is configured (time spent + startAtMillis)
     *
     * @return the start instant of the media
     */
    long getStartInstant();


    /**
     * The starting point of the media, in milliseconds. 0 by default, but can be used to skip intros or start at a certain point.
     *
     * @return the starting point of the media
     */
    int startAtMillis();

    /**
     * If the media should loop (jumping back to startAtMillis and playing again)
     *
     * @return if the media should loop
     */
    boolean loopMedia();

    /**
     * If the media should attempt to pick up where its currently according to the time spent since the start instant.
     *
     * @return if the media should attempt to pick up
     */
    boolean doPickup();

    /**
     * Fade time is the amount of milliseconds it takes to fade in or out. 0 by default, but can be used to create smooth transitions
     * between multiple regions, or to create a fade in effect.
     *
     * @return the fade time of the media
     */
    int getFadeTime();

    /**
     * Keep timeout is the amount of seconds that the openaudiomc plugin runtime should keep track of this media for.
     * Used to retroactively play media if a client connected too late. optional, -1 by default to disable.
     *
     * @return the keep timeout of the media
     */
    int getKeepTimeout();

    /**
     * If this media will mute current regions while playing. This is used to prevent overlapping media in regions.
     *
     * @return if the media will mute regions
     */
    boolean muteRegions();

    /**
     * If this media will mute the speakers of the client. This is used to prevent overlapping media with speakers.
     *
     * @return if the media will mute speakers
     */
    boolean muteSpeakers();

    /**
     * New media ID, used to identify the media for regions, stop commands and other features, can be any non-null string
     *
     * @param mediaId the new media id
     */
    void setMediaId(String mediaId);

    /**
     * Epoch millisecond timestamp of when the media started playing, used by the client to calculate the current position.
     *
     * @param startInstant the new start instant
     */
    void setStartInstant(long startInstant);

    /**
     * Amount of seconds to keep track of this media for, used to retroactively play media if a client connected too late.
     *
     * @param keepTimeout the new keep timeout in seconds
     */
    void setKeepTimeout(int keepTimeout);

    /**
     * If the media should attempt to pick up where its currently according to the time spent since the start instant.
     *
     * @param doPickup if the media should attempt to pick up
     */
    void setDoPickup(boolean doPickup);

    /**
     * If the media should loop (jumping back to startAtMillis and playing again), defaults to false
     *
     * @param loopMedia if the media should loop
     */
    void setLoopMedia(boolean loopMedia);


    /**
     * The amount of milliseconds to fade in or out. 0 by default, but can be used to create smooth transitions
     *
     * @param fadeTime the new fade time
     */
    void setFadeTime(int fadeTime);

    /**
     * The volume of the media, 0-100
     *
     * @param volume the new volume
     */
    void setVolume(int volume);

    /**
     * if this media should mute current regions while playing. This is used to prevent overlapping media in regions.
     *
     * @param muteRegions if the media should mute regions
     */
    void setMuteRegions(boolean muteRegions);

    /**
     * if this media should mute the speakers of the client. This is used to prevent overlapping media with speakers.
     *
     * @param muteSpeakers if the media should mute speakers
     */
    void setMuteSpeakers(boolean muteSpeakers);

    /**
     * The starting point of the media, in miliseconds. 0 by default, but can be used to skip intros or start at a certain point.
     *
     * @param startAtMillis the new starting point
     */
    void setStartAtMillis(int startAtMillis);

}
