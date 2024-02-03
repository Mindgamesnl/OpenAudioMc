package com.craftmend.openaudiomc.spigot.modules.regions.interfaces;

import com.craftmend.openaudiomc.generic.media.objects.Sound;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;

public interface RegionMutator {

    void feed(RegionProperties properties, Sound media);

}
