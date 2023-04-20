package com.craftmend.openaudiomc.spigot.modules.regions.listeners;

import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import lombok.AllArgsConstructor;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.world.WorldLoadEvent;

@AllArgsConstructor
public class WorldLoadListener implements Listener {

    private RegionModule regionModule;

    @EventHandler
    public void onWorldLoad(WorldLoadEvent event) {
        // register all regions that are not in a world, as they may be in this world
        regionModule.getWorld(event.getWorld().getName()).registerRegions(regionModule.getRegionsWithoutWorld());
    }

}
