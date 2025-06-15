package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;

public class Region implements IRegion {
    private String id;
    private RegionProperties regionProperties;
    private String worldName;

    @Override
    public Media getMedia() {
        if (getProperties() == null) return null;
        return regionProperties.getMediaForWorld(worldName);
    }

    @Override
    public RegionProperties getProperties() {
        return regionProperties;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setVolume(int volume) {
        regionProperties.setVolume(volume);
    }

    @Override
    public int getVolume() {
        return regionProperties.getVolume();
    }

    @Override
    public void setFadeTime(int fadeTime) {
        regionProperties.setFadeTimeMs(fadeTime);
    }

    @Override
    public int getFadeTime() {
        return regionProperties.getFadeTimeMs();
    }

    @Override
    public boolean syncEnabled() {
        return regionProperties.getDoSync();
    }

    public Region(final String id, final RegionProperties regionProperties, final String worldName) {
        this.id = id;
        this.regionProperties = regionProperties;
        this.worldName = worldName;
    }
}
