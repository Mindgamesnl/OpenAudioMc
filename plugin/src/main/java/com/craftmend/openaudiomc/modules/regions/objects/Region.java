package com.craftmend.openaudiomc.modules.regions.objects;

import com.craftmend.openaudiomc.modules.media.objects.Media;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Region implements IRegion {

    private String id;
    private RegionPropperties regionPropperties;

    @Override
    public Boolean equals(Region other) {
        if (getPropperties() == null) return null;
        return other.getPropperties().getMediaSrouce().equals(regionPropperties.getMediaSrouce());
    }

    @Override
    public Media getMedia() {
        if (getPropperties() == null) return null;
        return regionPropperties.getMedia();
    }

    @Override
    public RegionPropperties getPropperties() {
        return regionPropperties;
    }

    @Override
    public String getId() {
        return id;
    }

}
