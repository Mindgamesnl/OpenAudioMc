package com.craftmend.openaudiomc.spigot.modules.regions.interfaces;

import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.Region;
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
        for (ApiRegion r : selfInjected.getRegionsAtLocation(location)) {
            if (regionModule.getRegionPropertiesMap().get(r.getName()) == null) continue;
            if (r.getPriority() > prio) {
                prio = r.getPriority();
                regions.clear();
            }
            regions.add(new Region(r.getName(), regionModule.getRegionPropertiesMap().get(r.getName())));
        }
        return regions;
    }

    @NotNull
    protected Set<ApiRegion> prioritySort(Set<ApiRegion> regions, int highestPriority, boolean usePriority) {
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

        return new HashSet<>((highestRegion == null ? regions : Arrays.asList(highestRegion)));
    }

}
