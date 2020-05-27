package com.craftmend.openaudiomc.spigot.modules.regions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
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
        OpenAudioLogger.toConsole("Turns out you have WorldGuard installed! enabling regions and the region tasks..");

        if (openAudioMcSpigot.getServerService().getVersion() == ServerVersion.MODERN) {
            OpenAudioLogger.toConsole("Enabling the newer 1.13 regions");
            regionAdapter = new ModernRegionAdapter(this);
        } else {
            OpenAudioLogger.toConsole("Unknown version. Falling back to the 1.8 to 1.12 region implementation.");
            regionAdapter = new LegacyRegionAdapter(this);
        }

        //validate detection
        if (openAudioMcSpigot.getServerService().getVersion() == ServerVersion.LEGACY) {
            try {
                Class.forName("com.sk89q.worldguard.bukkit.WGBukkit");
            } catch (ClassNotFoundException e) {
                OpenAudioLogger.toConsole("Wrong world guard detection! re-switching to 1.13");
                regionAdapter = new ModernRegionAdapter(this);
            }
        }

        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();

        //load config
        for (String region : config.getStringSet("regions", StorageLocation.DATA_FILE)) {
            // before we actually add it, we should check if the WG region still exists, to lesser load
            if (regionAdapter.doesRegionExist(region.toLowerCase())) {
                String source = config.getStringFromPath("regions." + region, StorageLocation.DATA_FILE);
                int volume = config.getIntFromPath("regionsvolume." + region, StorageLocation.DATA_FILE);
                if (volume < 5) {
                    volume = 100;
                }

                RegionProperties properties = new RegionProperties(source, volume);
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

    public void forceUpdateRegions() {
        for (SpigotConnection client : OpenAudioMcSpigot.getInstance().getPlayerModule().getClients()) {
            if (client.getRegionHandler() != null) client.getRegionHandler().tick();
        }
    }

    public RegionMedia getRegionMedia(String source, int volume) {
        if (regionMediaMap.containsKey(source)) return regionMediaMap.get(source);
        RegionMedia regionMedia = new RegionMedia(source, volume);
        regionMediaMap.put(source, regionMedia);
        return regionMedia;
    }

    public void removeRegionMedia(String source) {
        regionMediaMap.remove(source);
    }
}
