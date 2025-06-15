package com.craftmend.openaudiomc.api.media;

import com.craftmend.openaudiomc.api.MediaApi;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
/**
 * A Media object represents the full state of a media file, including all settings and options.
 * This file is parsed by the client and used to play media of any type, also used internally for regions and speakers.
 */
public class Media {

    /**
     * Source value for the media. Typically, a web compatible web link or translatable OA value
     */
    @Setter
    private String source;

    /**
     * The unique id of the media, used by the client to keep track of media pools.
     * This is a random UUID by default, but can be set to a custom value and will be used to identify the media
     * for regions, stop commands and other features.
     */
    @Setter
    private String mediaId = UUID.randomUUID().toString();

    /**
     * An epoch millisecond timestamp of when the media started playing, used by the client to calculate the current position
     * if keepup is configured (time spent + startAtMillis)
     */
    @Setter
    private long startInstant;

    /**
     * Keep timeout is the amount of seconds that the openaudiomc plugin runtime should keep track of this media for.
     * Used to retroactively play media if a client connected too late. optional, -1 by default to disable.
     */
    @Setter
    private transient int keepTimeout = -1;

    /**
     * If the media should attempt to pick up where its currently according to the time spent since the start instant.
     */
    @Setter
    private boolean doPickup = false;

    /**
     * If the media should loop (jumping back to startAtMillis and playing again)
     */
    @Setter
    private boolean loop = false;

    /**
     * Fade time is the amount of milliseconds it takes to fade in or out. 0 by default, but can be used to create smooth transitions
     * between multiple regions, or to create a fade in effect.
     */
    @Setter
    private int fadeTime = 0;

    /**
     * The volume of the media, 0-100
     */
    @Setter
    private int volume = 100;

    /**
     * If this media will mute current regions while playing. This is used to prevent overlapping media in regions.
     */
    @Setter
    private boolean muteRegions = false;

    /**
     * If this media will mute the speakers of the client. This is used to prevent overlapping media with speakers.
     */
    @Setter
    private boolean muteSpeakers = false;

    /**
     * The starting point of the media, in milliseconds. 0 by default, but can be used to skip intros or start at a certain point.
     */
    @Setter
    private int startAtMillis = 0;

    /**
     * The flag of the media, used to identify the type of media. This is used by the client to apply different settings
     * based on the type of media. This is set to DEFAULT by default, but can be set to REGION or SPEAKER to apply different settings.
     */
    @Setter
    private MediaFlag flag = MediaFlag.DEFAULT;

    /**
     * Create a new media based on a url
     * the source will first be processed by the mutation api
     * so you can just use addons without needing to wor§§ry
     *
     * @param source the resource url
     */
    public Media(String source) {
        this.source = MediaApi.getInstance().translateSource(source);
        this.startInstant = MediaApi.getInstance().getNormalizedCurrentEpoch();
    }

    /**
     * You can apply multiple options.
     * Used by the commands to allow settings via JSON
     *
     * @param options The options. Selected via the command
     * @return instance of self
     */
    public Media applySettings(MediaOptions options) {
        this.loop = options.isLoop();
        this.keepTimeout = options.getExpirationTimeout();
        if (options.getId() != null) this.mediaId = options.getId();
        this.doPickup = options.isPickUp();
        this.setFadeTime(options.getFadeTime());
        this.volume = options.getVolume();
        this.muteRegions = options.isMuteRegions();
        this.muteSpeakers = options.isMuteSpeakers();
        this.startAtMillis = options.getStartAtMillis();
        return this;
    }

}
