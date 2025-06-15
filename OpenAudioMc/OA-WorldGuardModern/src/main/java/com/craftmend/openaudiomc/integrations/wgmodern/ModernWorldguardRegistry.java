package com.craftmend.openaudiomc.integrations.wgmodern;

import com.craftmend.openaudiomc.integrations.regionprovider.RegionRegistry;
import com.craftmend.openaudiomc.integrations.regionprovider.RegisteredRegion;
import com.sk89q.worldedit.bukkit.BukkitAdapter;
import com.sk89q.worldguard.protection.managers.RegionManager;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import org.bukkit.Bukkit;
import org.bukkit.Location;

import com.sk89q.worldguard.WorldGuard;
import com.sk89q.worldguard.protection.ApplicableRegionSet;
import com.sk89q.worldguard.protection.regions.RegionContainer;
import com.sk89q.worldguard.protection.regions.RegionQuery;
import org.bukkit.World;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class ModernWorldguardRegistry implements RegionRegistry {
    @Override
    public Set<RegisteredRegion> getRegionsAtLocation(Location location, boolean filterOnPriority) {

        RegionContainer container = WorldGuard.getInstance().getPlatform().getRegionContainer();
        RegionQuery query = container.createQuery();
        ApplicableRegionSet set = query.getApplicableRegions(BukkitAdapter.adapt(location));

        Integer highestPriority = Integer.MIN_VALUE;
        Set<RegisteredRegion> regions = set.getRegions()
                .stream()
                .map(ModernWrappedRegion::new)
                .collect(Collectors.toSet());

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
        RegionContainer container = WorldGuard.getInstance().getPlatform().getRegionContainer();
        for (World world : Bukkit.getWorlds()) {
            RegionManager manager = container.get(BukkitAdapter.adapt(world));
            if (manager != null) {
                for (Map.Entry<String, ProtectedRegion> entry : container.get(BukkitAdapter.adapt(world)).getRegions().entrySet()) {
                    String id = entry.getKey();
                    if (regionName.equals(id)) return true;
                }
            }
        }
        return false;
    }
}
