package com.craftmend.openaudiomc.modules.regions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.regions.enums.RegionsVersion;
import com.craftmend.openaudiomc.modules.regions.objects.IRegion;
import com.craftmend.openaudiomc.modules.regions.objects.Region;
import com.craftmend.openaudiomc.modules.regions.objects.RegionMedia;
import com.craftmend.openaudiomc.modules.regions.objects.RegionPropperties;

import com.sk89q.worldedit.bukkit.BukkitAdapter;
import com.sk89q.worldguard.WorldGuard;
import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.ApplicableRegionSet;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import com.sk89q.worldguard.protection.regions.RegionContainer;
import com.sk89q.worldguard.protection.regions.RegionQuery;
import org.bukkit.Bukkit;
import org.bukkit.Location;

import java.util.*;

public class RegionModule {

    private Map<String, RegionPropperties> regionProppertiesMap = new HashMap<>();
    private Map<String, RegionMedia> regionMediaMap = new HashMap<>();
    private RegionsVersion regionsVersion;

    public RegionModule(OpenAudioMc openAudioMc) {
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Turns out you have WorldGuard installed! enabling regions and the region tasks..");

        boolean isMinecraft13 = Bukkit.getServer().getClass().getPackage().getName().contains("1.13");
        if (isMinecraft13) {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Enabling the newer 1.13 regions");
            regionsVersion = RegionsVersion.V113;
        } else {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Unknown version. Falling back to the 1.8 to 1.12 region implementation.");
            regionsVersion = RegionsVersion.V112;
        }

        //load config
        for (String region : openAudioMc.getConfigurationModule().getDataConfig().getConfigurationSection("regions").getKeys(false)) {
            registerRegion(region, new RegionPropperties(openAudioMc.getConfigurationModule().getDataConfig().getString("regions." + region + "")));
        }

        Bukkit.getScheduler().scheduleAsyncRepeatingTask(openAudioMc, () -> {
            for (Client client : openAudioMc.getPlayerModule().getClients()) {
                if (client.getIsConnected()) client.tickRegions();
            }
        }, 10, 10);
    }

    public void registerRegion(String id, RegionPropperties propperties) {
        if (id == "iamnotactuallyaregionjustadefaultvaluesoyeahokaibye") return;
        regionProppertiesMap.put(id, propperties);
    }

    public void removeRegion(String id) {
        regionProppertiesMap.remove(id);
    }

    public RegionMedia getRegionMedia(String source) {
        if (regionMediaMap.containsKey(source)) return regionMediaMap.get(source);
        RegionMedia regionMedia = new RegionMedia(source);
        regionMediaMap.put(source, regionMedia);
        return regionMedia;
    }

    public RegionPropperties getPropperties(String region) {
        return regionProppertiesMap.get(region);
    }
    public RegionMedia getMedia(String source) {
        return regionMediaMap.get(source);
    }

    private List<IRegion> handleRegions(Set<ProtectedRegion> collection) {
        List<IRegion> regions = new ArrayList<>();
        int prio = 0;
        for (ProtectedRegion r : collection) {
            if (regionProppertiesMap.get(r.getId()) == null) continue;
            if (r.getPriority() > prio) {
                prio = r.getPriority();
                regions.clear();
            }
            regions.add(new Region(r.getId(), regionProppertiesMap.get(r.getId())));
        }
        return regions;
    }

    public List<IRegion> getRegions(Location location) {
        if (regionsVersion == RegionsVersion.V113) {
            RegionContainer container = WorldGuard.getInstance().getPlatform().getRegionContainer();
            RegionQuery query = container.createQuery();
            ApplicableRegionSet set = query.getApplicableRegions(BukkitAdapter.adapt(location));
            return handleRegions(set.getRegions());
        } else {
            return handleRegions(WGBukkit.getRegionManager(location.getWorld()).getApplicableRegions(location).getRegions());
        }
    }

}
