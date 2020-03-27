package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.media.enums.MediaFlag;
import com.craftmend.openaudiomc.generic.media.objects.Media;

public class RegionMedia extends Media {

    public RegionMedia(String source) {
        super(source);
        setLoop(true);
        setDoPickup(OpenAudioMc.getInstance().getConfigurationInterface().getboolean(StorageKey.SETTINGS_REGIONS_SYNC));
        setFadeTime(1000);
        setFlag(MediaFlag.REGION);
    }

}
