package com.craftmend.openaudiomc.api;

import com.craftmend.openaudiomc.api.regions.AudioRegion;
import com.craftmend.openaudiomc.api.spakers.BasicSpeaker;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;

public interface WorldApi {

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
