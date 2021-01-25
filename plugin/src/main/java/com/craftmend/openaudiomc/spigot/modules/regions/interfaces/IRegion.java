package com.craftmend.openaudiomc.spigot.modules.regions.interfaces;

import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;

public interface IRegion {

    /**
     * @return Media playing in the region
     */
    Media getMedia();

    /**
     * @return Extra settings related to the region
     */
    RegionProperties getProperties();


    /**
     * @return Region ID (So like the world guard name)
     */
    String getId();


    /**
     * Set the volume of the region
     * @param volume Volume (1 to 100)
     */
    void setVolume(int volume);

    /**
     * Get the region volume
     * @return Current region volume (1 to 100)
     */
    int getVolume();

    /**
     * Set the region fade time in MS
     * @param fadeTime Fade time in MS
     */
    void setFadeTime(int fadeTime);

    /**
     * Get the current fade time
     * @return Fade time in MS
     */
    int getFadeTime();
}
