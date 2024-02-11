package com.craftmend.openaudiomc.api.media;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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
        if (volume > 100)
            return new OptionalError(true, "Volume may not be over 100");

        if (volume < 0)
            return new OptionalError(true, "Volume may not be lower than 0");

        if (volume == 0)
            return new OptionalError(true, "You shouldn't even play it if the volume is 0");

        if (fadeTime < 0)
            return new OptionalError(true, "Fade time can't be negative");

        return new OptionalError(false, "");
    }

}
