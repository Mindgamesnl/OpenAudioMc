package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import lombok.AllArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
public class Region implements IRegion {

    private final String id;
    private final RegionProperties regionProperties;

    @Override
    public Media getMedia() {
        if (getProperties() == null) return null;
        return regionProperties.getMedia();
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
        long start = regionProperties.getMedia().getStartInstant();
        String oldId = regionProperties.getMedia().getMediaId();
        regionProperties.setVolume(volume);
        regionProperties.updateMedia(id);
        regionProperties.getMedia(); // trigger
        regionProperties.getMedia().setMediaId(oldId);
        regionProperties.getMedia().setStartInstant(start);
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


}
