package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.spigot.modules.media.objects.Media;

public interface IRegion {
    Media getMedia();
    RegionProperties getProperties();
    String getId();
}
