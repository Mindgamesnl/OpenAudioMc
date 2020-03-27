package com.craftmend.openaudiomc.spigot.modules.regions.adapters;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
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

import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ModernRegionAdapter extends AbstractRegionAdapter {

    public ModernRegionAdapter(RegionModule regionModule) {
        super(regionModule);
    }
    private boolean usePriority = OpenAudioMc.getInstance().getOAConfiguration().getBoolean(StorageKey.SETTINGS_USE_WG_PRIORITY);

    @Override
    public Set<ProtectedRegion> getRegionsAtLocation(Location location) {
        RegionContainer container = WorldGuard.getInstance().getPlatform().getRegionContainer();
        RegionQuery query = container.createQuery();
        ApplicableRegionSet set = query.getApplicableRegions(BukkitAdapter.adapt(location));

        int highestPriority = 0;
        ProtectedRegion highestRegion = null;
        Set<ProtectedRegion> regions = new HashSet<>(set.getRegions());

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
}
