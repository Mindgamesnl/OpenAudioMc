package com.craftmend.openaudiomc.api.media;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A set of media options that can be updated on the fly for live media streams.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MediaPatchOptions {

    /**
     * The volume of the media, 0-100
     */
    protected Integer volume = null;

    /**
     * The speed of the media, 100 by default, but can be used to speed up or slow down the media.
     * 100 = normal speed, 200 = double speed, 50 = half speed, etc.
     */
    protected Integer speed = null;

    /**
     * Fade time is the amount of milliseconds it takes to fade in or out. 0 by default, but can be used to create smooth transitions
     * between multiple regions, or to create a fade in effect.
     */
    @SerializedName("fadeTime")
    private int fadeTimeMs = 1500;

    // util setter
    public void setFadeTimeSeconds(int seconds) {
        this.fadeTimeMs = seconds * 1000;
    }

    public void setFadeTime(int ms) {
        this.fadeTimeMs = ms;
    }

    /**
     * Target media ID
     */
    private String target = "";

    public OptionalError validate() {
        if (speed != null) {
            // must be between (or equal) 0-100
            if (speed < 0 || speed > 1000)
                return new OptionalError(true, "Speed must be between 0 and 1000");
        }

        if (volume != null) {
            if (volume > 100)
                return new OptionalError(true, "Volume may not be over 100");

            if (volume < 0)
                return new OptionalError(true, "Volume may not be lower than 0");

            if (volume == 0)
                return new OptionalError(true, "You shouldn't even play it if the volume is 0");
        }

        return  new OptionalError(false, "");
    }

}
