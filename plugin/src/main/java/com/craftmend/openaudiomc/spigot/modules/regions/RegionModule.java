package com.craftmend.openaudiomc.spigot.modules.regions;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.interfaces.ConfigurationInterface;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.modules.regions.adapters.LegacyRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.adapters.ModernRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionMedia;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;

import lombok.Getter;
import java.util.*;

public class RegionModule {

    @Getter
    private Map<String, RegionProperties> regionPropertiesMap = new HashMap<>();
    private Map<String, RegionMedia> regionMediaMap = new HashMap<>();
    @Getter private AbstractRegionAdapter regionAdapter;

    public RegionModule(OpenAudioMcSpigot openAudioMcSpigot) {
        System.out.println(OpenAudioMcCore.getLOG_PREFIX() + "Turns out you have WorldGuard installed! enabling regions and the region tasks..");

        if (openAudioMcSpigot.getServerService().getVersion() == ServerVersion.MODERN) {
            System.out.println(OpenAudioMcCore.getLOG_PREFIX() + "Enabling the newer 1.13 regions");
            regionAdapter = new ModernRegionAdapter(this);
        } else {
            System.out.println(OpenAudioMcCore.getLOG_PREFIX() + "Unknown version. Falling back to the 1.8 to 1.12 region implementation.");
            regionAdapter = new LegacyRegionAdapter(this);
        }

        //validate detection
        if (openAudioMcSpigot.getServerService().getVersion() == ServerVersion.LEGACY) {
            try {
                Class.forName("com.sk89q.worldguard.bukkit.WGBukkit");
            } catch (ClassNotFoundException e) {
                System.out.println(OpenAudioMcCore.getLOG_PREFIX() + "Wrong world guard detection! re-switching to 1.13");
                regionAdapter = new ModernRegionAdapter(this);
            }
        }

        ConfigurationInterface config = OpenAudioMcCore.getInstance().getConfigurationInterface();

        //load config
        for (String region : config.getStringSet("regions", StorageLocation.DATA_FILE)) {
            // before we actually add it, we should check if the WG region still exists, to lesser load
            if (regionAdapter.doesRegionExist(region.toLowerCase())) {
                String source = config.getStringFromPath("regions." + region, StorageLocation.DATA_FILE);
                RegionProperties properties = new RegionProperties(source);
                registerRegion(region, properties);
            }
        }
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
