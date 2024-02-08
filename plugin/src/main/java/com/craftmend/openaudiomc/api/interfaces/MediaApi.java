package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.api.media.MediaOptions;

@Deprecated
public interface MediaApi {

    /**
     * Play a simple sound for a client
     * @param client Target client
     * @param source Media source
     */
    void playMedia(Client client, String source);

    /**
     * Play a sound for a client with media options (like volume, id, looping, synchronization etc)
     * @param client Target client
     * @param source Media source
     */
    void playMedia(Client client, String source, MediaOptions mediaOptions);

    /**
     * Stop all non spatial sounds regardless of their ID
     * @param client Target client
     */
    void stopMedia(Client client);

    /**
     * Stop a specific simple media by ID
     * @param client Target client
     * @param id Sound ID
     */
    void stopMedia(Client client, String id);

    /**
     * Create a tracked spatial sound for a client. Defaults to non surround (2d, so just volume based on distance)
     * but you can also enable surround sound, which does just what it sounds like
     *
     * @param client Target client
     * @param source Media source
     * @param x Static X location in the world
     * @param y Static Y location in the world
     * @param z Static Z location in the world
     * @param radius Radius that the sound can be heard in, in blocks
     * @param useSurroundSound If surround sound should be enabled
     * @param obstructions The amount of obstructions to be processed, only available for 3d speakers, 0 to disable
     * @return The ID of the created sound, unique per client
     */
    String playSpatialSound(Client client, String source, int x, int y, int z, int radius, boolean useSurroundSound, int obstructions);


    /**
     * Destroy a spatial audio source
     * @param client Target client
     * @param spatialSoundId The ID of the created sound, unique per client
     */
    void stopSpatialSound(Client client, String spatialSoundId);


}
