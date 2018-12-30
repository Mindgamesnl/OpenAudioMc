package com.craftmend.openaudiomc.modules.regions.objects;

import com.craftmend.openaudiomc.modules.media.objects.Media;

public interface IRegion {
    Boolean equals(Region other);
    Media getMedia();
    RegionPropperties getPropperties();
    String getId();
}
