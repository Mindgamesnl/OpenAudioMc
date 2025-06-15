package com.craftmend.openaudiomc.spigot.modules.regions.registry;

import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionMedia;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class WorldRegionManager {

    private String world;

    // map region source -> shared media
    private final Map<String, RegionMedia> regionMediaMap = new HashMap<>();

    // map region name -> region properties / settings
    private final Map<String, RegionProperties> regionPropertiesMap = new HashMap<>();

    public WorldRegionManager(String world) {
        this.world = world;
    }

    public void registerRegion(RegionProperties addedRegion) {
        // check if we already have this region
        if (regionPropertiesMap.containsKey(addedRegion.getRegionName())) {
            // is the one we are adding newer?
            RegionProperties currentRegion = regionPropertiesMap.get(addedRegion.getRegionName());

            if (currentRegion.getId() != null && addedRegion.getId() != null && currentRegion.getId() > addedRegion.getId()) {
                // nope, we already have a newer one
                return;
            }
        }

        regionPropertiesMap.put(addedRegion.getRegionName(), addedRegion);

        // update media
        if (regionMediaMap.get(addedRegion.getSource()) != null) {
            regionMediaMap.get(addedRegion.getSource()).setVolume(addedRegion.getVolume());
            regionMediaMap.get(addedRegion.getSource()).setFadeTime(addedRegion.getFadeTimeMs());
        }

        if (StorageKey.SETTINGS_HYDRATE_REGIONS_ON_BOOT.getBoolean()) {
            addedRegion.getMediaForWorld(this);
        }
    }

    public RegionProperties getRegionProperties(String regionName) {
        return regionPropertiesMap.get(regionName);
    }

    public void unregisterRegion(String regionName) {
        regionPropertiesMap.remove(regionName);
    }

    public boolean containsRegion(String regionName) {
        return regionPropertiesMap.containsKey(regionName);
    }

    public RegionMedia getRegionMedia(String source, int volume, int fadeTimeMs, Boolean loop) {
        if (regionMediaMap.containsKey(source)) return regionMediaMap.get(source);
        RegionMedia regionMedia = new RegionMedia(source, volume, fadeTimeMs, loop);
        regionMediaMap.put(source, regionMedia);
        return regionMedia;
    }

    public void dropMediaCache() {
        regionMediaMap.clear();
    }

    public Collection<RegionProperties> getRegions() {
        return regionPropertiesMap.values();
    }

    public void unregisterRegionMedia(String source) {
        regionMediaMap.remove(source);
    }

    public void clearMediaCache() {
        regionMediaMap.clear();
    }

    public int getRegionCount() {
        return regionPropertiesMap.size();
    }

    public void registerRegions(Set<RegionProperties> regionsWithoutWorld) {
        regionsWithoutWorld.forEach(this::registerRegion);
    }
}
