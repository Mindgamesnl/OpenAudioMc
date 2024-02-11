package com.craftmend.openaudiomc.api;

import com.craftmend.openaudiomc.api.regions.AudioRegion;
import com.craftmend.openaudiomc.api.speakers.BasicSpeaker;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;


/**
 * The WorldApi is a collection of methods to interact with features that is linked to worlds.
 * This API is only available if the OpenAudioMc plugin on spigot, and is not available on the bungee side.
 */
public interface WorldApi {

    /**
     * Get an instance of the world api. May be null if the plugin is not loaded yet
     * @return instance
     */
    static WorldApi getInstance() {
        if (ApiHolder.worldApiInstance == null) {
            throw new IllegalStateException("OpenAudioMc has not been initialized yet");
        }
        return ApiHolder.worldApiInstance;
    }

    /**
     * Get all regions at a location
     * @param x x
     * @param y y
     * @param z z
     * @param world world
     * @return regions
     */
    @NotNull
    Collection<AudioRegion> getRegionsAt(int x, int y, int z, @NotNull String world);

    /**
     * Get a speaker at a location, or null if invalid
     * @param x x
     * @param y y
     * @param z z
     * @param world world
     * @return speaker
     */
    @Nullable
    BasicSpeaker getSpeakerAt(int x, int y, int z, @NotNull String world);

}
