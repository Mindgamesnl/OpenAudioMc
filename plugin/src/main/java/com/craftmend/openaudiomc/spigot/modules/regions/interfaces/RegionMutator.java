package com.craftmend.openaudiomc.spigot.modules.regions.interfaces;

import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;

public interface RegionMutator {

    void feed(RegionProperties properties, Media media);

}
