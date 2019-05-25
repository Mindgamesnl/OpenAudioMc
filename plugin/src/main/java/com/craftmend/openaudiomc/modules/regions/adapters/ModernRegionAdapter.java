package com.craftmend.openaudiomc.modules.regions.adapters;

import com.craftmend.openaudiomc.modules.regions.RegionModule;
import com.craftmend.openaudiomc.modules.regions.interfaces.AbstractRegionAdapter;
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

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ModernRegionAdapter extends AbstractRegionAdapter {

    public ModernRegionAdapter(RegionModule regionModule) {
        super(regionModule);
    }

    @Override
    public Set<ProtectedRegion> getRegionsAtLocation(Location location) {
        RegionContainer container = WorldGuard.getInstance().getPlatform().getRegionContainer();
        RegionQuery query = container.createQuery();
        ApplicableRegionSet set = query.getApplicableRegions(BukkitAdapter.adapt(location));
        return new HashSet<>(set.getRegions());
    }

    @Override
    public Boolean doesRegionExist(String name) {
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
