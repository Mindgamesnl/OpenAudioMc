package com.craftmend.openaudiomc.spigot.modules.regions.interfaces;

import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.Region;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import org.bukkit.Location;
import org.jetbrains.annotations.NotNull;

import java.util.*;

public abstract class RegionAdapterBase {

    private final RegionModule regionModule;
    private AbstractRegionAdapter selfInjected;

    protected RegionAdapterBase(RegionModule regionModule) {
        this.regionModule = regionModule;
    }

    protected void injectSelf(AbstractRegionAdapter selfInjected) {
        this.selfInjected = selfInjected;
    }

    public List<IRegion> getAudioRegions(Location location) {
        List<IRegion> regions = new ArrayList<>();
        int prio = 0;
        WorldRegionManager worldRegionManager = regionModule.getWorld(location.getWorld().getName());
        for (ApiRegion r : selfInjected.getRegionsAtLocation(location)) {

            RegionProperties rp = worldRegionManager.getRegionProperties(r.getName());
            if (rp == null) continue;

            if (rp.hasWorlds()) {
                // is our world in the array?
                boolean hasWorld = false;
                for (String world : rp.getWorlds()) {
                    if (world.equalsIgnoreCase(location.getWorld().getName())) {
                        hasWorld = true;
                        break;
                    }
                }
                if (!hasWorld) continue;
            }

            if (r.getPriority() > prio) {
                prio = r.getPriority();
                regions.clear();
            }

            if (r.getPriority() >= prio) {
                regions.add(new Region(r.getName(), rp, location.getWorld().getName()));
            }
        }
        return regions;
    }

    @NotNull
    protected Set<ApiRegion> prioritySort(Set<ApiRegion> regions, Integer highestPriority, boolean usePriority) {
        ApiRegion highestRegion = null;
        if (usePriority) {
            for (ApiRegion region : regions) {
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
