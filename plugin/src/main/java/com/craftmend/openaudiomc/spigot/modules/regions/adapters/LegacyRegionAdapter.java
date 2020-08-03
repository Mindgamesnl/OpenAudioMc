package com.craftmend.openaudiomc.spigot.modules.regions.adapters;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.World;
import org.jetbrains.annotations.NotNull;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class LegacyRegionAdapter extends AbstractRegionAdapter {

    public LegacyRegionAdapter(RegionModule regionModule) {
        super(regionModule);
    }
    private boolean usePriority = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_USE_WG_PRIORITY);

    @Override
    public Set<ProtectedRegion> getRegionsAtLocation(Location location) {

        Set<ProtectedRegion> regions = WGBukkit.getRegionManager(location.getWorld()).getApplicableRegions(location).getRegions();

        int highestPriority = 0;
        ProtectedRegion highestRegion = null;

        return prioritySort(regions, highestPriority, highestRegion, usePriority);
    }

    @Override
    public boolean doesRegionExist(String name) {
        for (World world : Bukkit.getWorlds()) {
            for (Map.Entry<String, ProtectedRegion> entry : WGBukkit.getRegionManager(world).getRegions().entrySet()) {
                if (name.equals(entry.getKey())) return true;
            }
        }
        return false;
    }
}
