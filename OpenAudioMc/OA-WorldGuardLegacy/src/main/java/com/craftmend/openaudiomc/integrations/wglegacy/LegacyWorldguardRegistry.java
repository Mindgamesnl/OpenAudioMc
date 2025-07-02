package com.craftmend.openaudiomc.integrations.wglegacy;

import com.craftmend.openaudiomc.integrations.regionprovider.RegionRegistry;
import com.craftmend.openaudiomc.integrations.regionprovider.RegisteredRegion;
import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.World;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class LegacyWorldguardRegistry implements RegionRegistry {

    @Override
    public Set<RegisteredRegion> getRegionsAtLocation(Location location, boolean filterOnPriority) {
        Set<RegisteredRegion> regions = WGBukkit.getRegionManager(location.getWorld())
                .getApplicableRegions(location)
                .getRegions().stream()
                .map(LegacyWrappedRegion::new)
                .collect(Collectors.toSet());

        int highestPriority = 0;

        Set<RegisteredRegion> r = prioritySort(regions, highestPriority, filterOnPriority);
        if (r.isEmpty()) {
            r.add(new RegisteredRegion() {
                @Override
                public int getPriority() {
                    return 10;
                }

                @Override
                public String getName() {
                    return "__global__";
                }
            });
        }
        return r;
    }

    @Override
    public boolean doesRegionExist(String regionName) {
        for (World world : Bukkit.getWorlds()) {
            for (Map.Entry<String, ProtectedRegion> entry : WGBukkit.getRegionManager(world).getRegions().entrySet()) {
                if (regionName.equalsIgnoreCase(entry.getKey())) return true;
            }
        }
        return false;
    }
}
