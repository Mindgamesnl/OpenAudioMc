package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.generic.utils.HeatMap;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import org.bukkit.Location;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.List;

public interface WorldApi {

    /**
     * Forcefully enable the region system with your own adapter
     * In cases where you use something custom instead of worlduard
     * @param regionHandler Region adapter
     */
    void setRegionHandler(AbstractRegionAdapter regionHandler);

    /**
     * Get applicable audio regions on a location
     * @param location Target location
     * @return Applicable regions
     */
    Collection<IRegion> getApplicableRegions(Location location);

    /**
     * Get a speaker instance for a placed speaker at a location, or null if invalid
     * @param location Target location
     * @return Speaker, or null
     */
    @Nullable
    Speaker getPhysicalSpeaker(Location location);

    /**
     * Get the predicted sources for a location
     * @param location target location to scan
     * @return collection of sources that'll likely be played
     */
    Collection<String> getPredictedSources(Location location);

    /**
     * Get the prediction chunk context for predictive audio
     * @param location Location to get
     * @return chunk context copy
     */
    HeatMap<String, Byte> getChunkContext(Location location);

    /**
     * Save updated chunk context
     * @param location Location to apply to
     * @param context Context
     */
    void setChunkContext(Location location, List<HeatMap<String, Byte>.Value> context);
}
