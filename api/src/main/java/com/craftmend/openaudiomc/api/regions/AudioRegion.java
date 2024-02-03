package com.craftmend.openaudiomc.api.regions;

import com.craftmend.openaudiomc.api.media.Media;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public interface AudioRegion {

    /**
     * Get the media playing in this region
     * @return media
     */
    @NotNull
    Media getMedia();

    /**
     * Get the region id
     * @return id
     */
    @NotNull
    String getRegionId();

    /**
     * Get the world this region is in, can be null if its legacy
     * @return world
     */
    @Nullable
    String getWorld();

    /**
     * Get the priority of this region
     * @return priority
     */
    int getPriority();

}
