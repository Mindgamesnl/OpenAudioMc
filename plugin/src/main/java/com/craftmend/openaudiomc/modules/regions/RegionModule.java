package com.craftmend.openaudiomc.modules.regions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.configuration.ConfigurationModule;
import com.craftmend.openaudiomc.modules.configuration.enums.StorageLocation;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.regions.adapters.LegacyRegionAdapter;
import com.craftmend.openaudiomc.modules.regions.adapters.ModernRegionAdapter;
import com.craftmend.openaudiomc.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.modules.regions.objects.RegionMedia;
import com.craftmend.openaudiomc.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.services.server.enums.ServerVersion;

import lombok.Getter;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.scheduler.BukkitRunnable;
import java.util.*;

public class RegionModule {

    @Getter
    private Map<String, RegionProperties> regionPropertiesMap = new HashMap<>();
    private Map<String, RegionMedia> regionMediaMap = new HashMap<>();
    @Getter private AbstractRegionAdapter regionAdapter;

    public RegionModule(OpenAudioMc openAudioMc) {
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Turns out you have WorldGuard installed! enabling regions and the region tasks..");

        if (openAudioMc.getServerService().getVersion() == ServerVersion.MODERN) {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Enabling the newer 1.13 regions");
            regionAdapter = new ModernRegionAdapter(this);
        } else {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Unknown version. Falling back to the 1.8 to 1.12 region implementation.");
            regionAdapter = new LegacyRegionAdapter(this);
        }

        //validate detection
        if (openAudioMc.getServerService().getVersion() == ServerVersion.LEGACY) {
            try {
                Class.forName("com.sk89q.worldguard.bukkit.WGBukkit");
            } catch (ClassNotFoundException e) {
                System.out.println(OpenAudioMc.getLOG_PREFIX() + "Wrong world guard detection! re-switching to 1.13");
                regionAdapter = new ModernRegionAdapter(this);
            }
        }

        ConfigurationModule config = openAudioMc.getConfigurationModule();

        //load config
        for (String region : config.getStringSet("regions", StorageLocation.DATA_FILE)) {
            // before we actually add it, we should check if the WG region still exists, to lesser load
            if (regionAdapter.doesRegionExist(region.toLowerCase())) {
                String source = config.getStringFromPath("regions." + region, StorageLocation.DATA_FILE);
                RegionProperties properties = new RegionProperties(source);
                registerRegion(region, properties);
            }
        }

        new BukkitRunnable() {
            @Override
            public void run() {
                for (Client client : openAudioMc.getPlayerModule().getClients()) {
                    if (client.getIsConnected()) client.getRegionHandler().tick();
                }
            }
        }.runTaskTimerAsynchronously(openAudioMc, 10, 10);
    }

    public void registerRegion(String id, RegionProperties propperties) {
        regionPropertiesMap.put(id, propperties);
    }

    public void removeRegion(String id) {
        regionPropertiesMap.remove(id);
    }

    public RegionMedia getRegionMedia(String source) {
        if (regionMediaMap.containsKey(source)) return regionMediaMap.get(source);
        RegionMedia regionMedia = new RegionMedia(source);
        regionMediaMap.put(source, regionMedia);
        return regionMedia;
    }
}
