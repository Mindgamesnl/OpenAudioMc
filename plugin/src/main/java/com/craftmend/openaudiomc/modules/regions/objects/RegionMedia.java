package com.craftmend.openaudiomc.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.modules.media.enums.MediaFlag;
import com.craftmend.openaudiomc.modules.media.objects.Media;

public class RegionMedia extends Media {

    public RegionMedia(String source) {
        super(source);
        setLoop(true);
        setDoPickup(OpenAudioMc.getInstance().getConfigurationModule().getBoolean(StorageKey.SETTINGS_REGIONS_SYNC));
        setFadeTime(1000);
        setFlag(MediaFlag.REGION);
    }

}
