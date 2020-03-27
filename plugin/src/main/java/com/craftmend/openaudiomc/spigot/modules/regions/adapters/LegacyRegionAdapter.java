package com.craftmend.openaudiomc.spigot.modules.regions.adapters;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.World;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class LegacyRegionAdapter extends AbstractRegionAdapter {

    public LegacyRegionAdapter(RegionModule regionModule) {
        super(regionModule);
    }
    private boolean usePriority = OpenAudioMc.getInstance().getConfigurationInterface().getboolean(StorageKey.SETTINGS_USE_WG_PRIORITY);

    @Override
    public Set<ProtectedRegion> getRegionsAtLocation(Location location) {

        Set<ProtectedRegion> regions = WGBukkit.getRegionManager(location.getWorld()).getApplicableRegions(location).getRegions();

        int highestPriority = 0;
        ProtectedRegion highestRegion = null;

        if (usePriority) {
            for (ProtectedRegion region : regions) {
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
