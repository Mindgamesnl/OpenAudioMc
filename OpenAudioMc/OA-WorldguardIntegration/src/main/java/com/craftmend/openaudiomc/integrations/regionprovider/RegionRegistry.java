package com.craftmend.openaudiomc.integrations.regionprovider;

import org.bukkit.Location;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public interface RegionRegistry {

    /**
     * Find regions on a location.
     * @param location the location to check for regions
     * @param filterOnPriority whether to filter regions based on priority
     * @return a set of regions at the given location, or an empty list if none are found
     */
    Set<RegisteredRegion> getRegionsAtLocation(
            Location location,
            boolean filterOnPriority
    );

    /**
     * Check if a region exists by its name (case-insensitive, in any world).
     * @param regionName the name of the region to check for
     * @return true if the region exists, false otherwise
     */
    boolean doesRegionExist(
            String regionName
    );

    /**
     * Sorts the regions based on their priority.
     * If usePriority is true, it will return the region with the highest priority.
     * If no regions have a priority, it will return all regions.
     *
     * @param regions the set of regions to sort
     * @param highestPriority the current highest priority found
     * @param usePriority whether to use priority for sorting
     * @return a set containing the region with the highest priority or all regions if no priority is used
     */
    default Set<RegisteredRegion> prioritySort(Set<RegisteredRegion> regions, Integer highestPriority, boolean usePriority) {
        RegisteredRegion highestRegion = null;
        if (usePriority) {
            for (RegisteredRegion region : regions) {
                if (region.getPriority() != 0) {
                    if (region.getPriority() > highestPriority) {
                        highestPriority = region.getPriority();
                        highestRegion = region;
                    }
                }
            }
        }

        return new HashSet<>((highestRegion == null ? regions : Collections.singletonList(highestRegion)));
    }

}
