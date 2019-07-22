package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.media.enums.MediaFlag;
import com.craftmend.openaudiomc.spigot.modules.media.objects.Media;

public class RegionMedia extends Media {

    public RegionMedia(String source) {
        super(source);
        setLoop(true);
        setDoPickup(OpenAudioMc.getInstance().getConfigurationModule().getBoolean(StorageKey.SETTINGS_REGIONS_SYNC));
        setFadeTime(1000);
        setFlag(MediaFlag.REGION);
    }

}
