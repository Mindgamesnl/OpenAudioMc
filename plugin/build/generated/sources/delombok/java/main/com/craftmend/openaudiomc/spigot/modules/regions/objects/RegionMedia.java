package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.api.media.MediaFlag;

public class RegionMedia extends Media {

    public RegionMedia(String source, int volume, int fadeTimeMs, Boolean loop) {
        super(source);
        setLoop(loop);
        if (loop) setDoPickup(OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_REGIONS_SYNC));
        setFadeTime(fadeTimeMs);
        setVolume(volume);
        setFlag(MediaFlag.REGION);
    }

}
