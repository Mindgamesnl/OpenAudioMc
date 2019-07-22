package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.generic.media.enums.MediaFlag;
import com.craftmend.openaudiomc.generic.media.objects.Media;

public class RegionMedia extends Media {

    public RegionMedia(String source) {
        super(source);
        setLoop(true);
        setDoPickup(OpenAudioMcCore.getInstance().getConfigurationInterface().getBoolean(StorageKey.SETTINGS_REGIONS_SYNC));
        setFadeTime(1000);
        setFlag(MediaFlag.REGION);
    }

}
