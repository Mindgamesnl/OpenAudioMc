package com.craftmend.openaudiomc.spigot.modules.regions.interfaces;

import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;

public interface IRegion {

    IRegion EMPTY = new EmptyRegion() {};

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

    /**
     * Weather the attached media should have its keepup flag enabled
     * @return if syncing is enabled
     */
    boolean syncEnabled();

    public class EmptyRegion implements IRegion {

        @Override
        public Media getMedia() {
            return null;
        }

        @Override
        public RegionProperties getProperties() {
            return null;
        }

        @Override
        public String getId() {
            return null;
        }

        @Override
        public void setVolume(int volume) {

        }

        @Override
        public int getVolume() {
            return 0;
        }

        @Override
        public void setFadeTime(int fadeTime) {

        }

        @Override
        public int getFadeTime() {
            return 0;
        }

        @Override
        public boolean syncEnabled() {
            return false;
        }
    }
}
