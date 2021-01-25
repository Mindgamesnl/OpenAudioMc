package com.craftmend.openaudiomc.spigot.modules.regions.adapters;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.ApiRegion;
import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.World;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class LegacyRegionAdapter extends AbstractRegionAdapter {

    public LegacyRegionAdapter(RegionModule regionModule) {
        super(regionModule);
    }
    private boolean usePriority = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_USE_WG_PRIORITY);

    @Override
    public Set<ApiRegion> getRegionsAtLocation(Location location) {

        Set<ApiRegion> regions = WGBukkit.getRegionManager(location.getWorld())
                .getApplicableRegions(location)
                .getRegions().stream()
                .map(ApiRegion::wrapWorldGuard)
                .collect(Collectors.toSet());

        int highestPriority = 0;

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
        for (World world : Bukkit.getWorlds()) {
            for (Map.Entry<String, ProtectedRegion> entry : WGBukkit.getRegionManager(world).getRegions().entrySet()) {
                if (name.equals(entry.getKey())) return true;
            }
        }
        return false;
    }
}
