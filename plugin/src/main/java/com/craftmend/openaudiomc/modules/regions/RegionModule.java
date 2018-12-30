package com.craftmend.openaudiomc.modules.regions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.regions.objects.RegionPropperties;
import com.sk89q.worldedit.bukkit.BukkitAdapter;
import com.sk89q.worldguard.WorldGuard;
import com.sk89q.worldguard.protection.ApplicableRegionSet;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import com.sk89q.worldguard.protection.regions.RegionContainer;
import com.sk89q.worldguard.protection.regions.RegionQuery;
import org.bukkit.Bukkit;
import org.bukkit.Location;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RegionModule {

    private Map<String, RegionPropperties> regionProppertiesMap = new HashMap<>();

    public RegionModule(OpenAudioMc openAudioMc) {
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Turns out you have WorldGuard installed! enabling regions and the region tasks..");

        Bukkit.getScheduler().scheduleAsyncRepeatingTask(openAudioMc, () -> {
            for (Client client : openAudioMc.getPlayerModule().getClients()) {
                if (client.getIsConnected()) client.tickRegions();
            }
        }, 20 * 2, 20 * 2);
    }

    public RegionPropperties getPropperties(String region) {
        return regionProppertiesMap.get(region);
    }

    public List<String> getRegions(Location location) {
        List<String> names = new ArrayList<>();
        int prio = 0;
        RegionContainer container = WorldGuard.getInstance().getPlatform().getRegionContainer();
        RegionQuery query = container.createQuery();
        ApplicableRegionSet set = query.getApplicableRegions(BukkitAdapter.adapt(location));
        for (ProtectedRegion r : set.getRegions()) {
            if (r.getPriority() > prio) {
                prio = r.getPriority();
                names.clear();
            }
            names.add(r.getId());
        }
        return names;
    }

}
