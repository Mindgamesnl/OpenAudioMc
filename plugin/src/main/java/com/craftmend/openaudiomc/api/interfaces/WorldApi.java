package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import org.bukkit.Location;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;

public interface WorldApi {

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

}
