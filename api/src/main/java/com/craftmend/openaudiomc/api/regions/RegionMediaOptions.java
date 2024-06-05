package com.craftmend.openaudiomc.api.regions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents media options for a region, this is not a full subset of the normal media options
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
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

}
