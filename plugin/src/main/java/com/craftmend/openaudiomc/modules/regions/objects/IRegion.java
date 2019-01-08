package com.craftmend.openaudiomc.modules.regions.objects;

import com.craftmend.openaudiomc.modules.media.objects.Media;

public interface IRegion {
    Media getMedia();
    RegionProperties getPropperties();
    String getId();
}
