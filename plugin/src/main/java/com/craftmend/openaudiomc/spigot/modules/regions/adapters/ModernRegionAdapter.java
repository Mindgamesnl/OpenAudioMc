package com.craftmend.openaudiomc.spigot.modules.regions.adapters;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.ApiRegion;
import com.sk89q.worldedit.bukkit.BukkitAdapter;
import com.sk89q.worldguard.WorldGuard;
import com.sk89q.worldguard.protection.ApplicableRegionSet;
import com.sk89q.worldguard.protection.managers.RegionManager;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import com.sk89q.worldguard.protection.regions.RegionContainer;
import com.sk89q.worldguard.protection.regions.RegionQuery;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.World;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class ModernRegionAdapter extends AbstractRegionAdapter {

    private boolean booted = false;
    private final boolean usePriority = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_USE_WG_PRIORITY);

    public ModernRegionAdapter(RegionModule regionModule) {
        super(regionModule);
    }

    @Override
    public Set<ApiRegion> getRegionsAtLocation(Location location) {
        RegionContainer container = WorldGuard.getInstance().getPlatform().getRegionContainer();
        RegionQuery query = container.createQuery();
        ApplicableRegionSet set = query.getApplicableRegions(BukkitAdapter.adapt(location));

        Integer highestPriority = Integer.MIN_VALUE;
        Set<ApiRegion> regions = set.getRegions()
                .stream()
                .map(ApiRegion::wrapWorldGuard)
                .collect(Collectors.toSet());

        Set<ApiRegion> r = prioritySort(regions, highestPriority, usePriority);
        if (r.isEmpty()) {
            r.add(new ApiRegion() {
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
    public boolean doesRegionExist(String name) {
        if (!booted) return true;
        RegionContainer container = WorldGuard.getInstance().getPlatform().getRegionContainer();
        for (World world : Bukkit.getWorlds()) {
            RegionManager manager = container.get(BukkitAdapter.adapt(world));
            if (manager != null) {
                for (Map.Entry<String, ProtectedRegion> entry : container.get(BukkitAdapter.adapt(world)).getRegions().entrySet()) {
                    String id = entry.getKey();
                    if (name.equals(id)) return true;
                }
            }
        }
        return false;
    }

    @Override
    public void postLoad() {
        booted = true;
    }
}
