package com.craftmend.openaudiomc.modules.regions.objects;

import com.craftmend.openaudiomc.modules.media.objects.Media;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Region implements IRegion {

    private String id;
    private RegionProperties regionProperties;

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

}
