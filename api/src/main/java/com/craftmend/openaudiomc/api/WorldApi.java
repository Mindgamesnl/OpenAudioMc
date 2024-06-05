package com.craftmend.openaudiomc.api;

import com.craftmend.openaudiomc.api.exceptions.InvalidRegionException;
import com.craftmend.openaudiomc.api.exceptions.InvalidThreadException;
import com.craftmend.openaudiomc.api.exceptions.UnknownWorldException;
import com.craftmend.openaudiomc.api.regions.AudioRegion;
import com.craftmend.openaudiomc.api.regions.RegionMediaOptions;
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
     *
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
     *
     * @param x     x
     * @param y     y
     * @param z     z
     * @param world world
     * @return regions
     */
    @NotNull
    Collection<AudioRegion> getRegionsAt(int x, int y, int z, @NotNull String world);

    /**
     * Get a speaker at a location, or null if invalid
     *
     * @param x     x
     * @param y     y
     * @param z     z
     * @param world world
     * @return speaker
     */
    @Nullable
    BasicSpeaker getSpeakerAt(int x, int y, int z, @NotNull String world);

    /**
     * Register a region in a world.
     * Important:
     * - this will overwrite current temporary regions
     * - this will throw an invalid region exception if the region is not found
     * - this will throw an unknown world exception if the world is not loaded
     * - this will throw an invalid region exception if the region already has permanent media
     * - this will throw an invalid thread exception if not called from the main thread
     *
     * @param worldName   world
     * @param regionId    id
     * @param regionMedia the media to attach
     * @throws UnknownWorldException                                           if the world is not loaded
     * @throws InvalidRegionException                                          if the region is not found
     * @throws com.craftmend.openaudiomc.api.exceptions.InvalidThreadException if not called from the main thread
     * @since 6.10.2
     */
    void registerRegion(String worldName, String regionId, RegionMediaOptions regionMedia) throws
            UnknownWorldException, InvalidThreadException, InvalidRegionException;

    /**
     * Register a temporary region in a world
     * Important:
     * - this will overwrite current temporary regions
     * - this will throw an invalid region exception if the region is not found
     * - this will throw an unknown world exception if the world is not loaded
     * - this will throw an invalid region exception if the region already has permanent media
     * - this will throw an invalid thread exception if not called from the main thread
     *
     * @param worldName   world
     * @param regionId    the region to targe
     * @param regionMedia the media to attach
     * @param duration    the duration in seconds
     * @throws UnknownWorldException                                           if the world is not loaded
     * @throws InvalidRegionException                                          if the region is not found
     * @throws com.craftmend.openaudiomc.api.exceptions.InvalidThreadException if not called from the main thread
     * @since 6.10.2
     */
    void registerTempRegion(String worldName, String regionId, RegionMediaOptions regionMedia, int duration) throws
            UnknownWorldException, InvalidThreadException, InvalidRegionException;

    /**
     * Unregister a region from the world
     *
     * @param worldName world
     * @param regionId  region id
     * @throws com.craftmend.openaudiomc.api.exceptions.InvalidThreadException if not called from the main thread
     * @since 6.10.2
     */
    void unregisterRegion(String worldName, String regionId) throws InvalidThreadException;

}
