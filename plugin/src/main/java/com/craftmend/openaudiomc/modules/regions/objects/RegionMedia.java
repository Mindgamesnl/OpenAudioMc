package com.craftmend.openaudiomc.modules.regions.objects;

import com.craftmend.openaudiomc.modules.media.enums.MediaFlag;
import com.craftmend.openaudiomc.modules.media.objects.Media;

public class RegionMedia extends Media {

    public RegionMedia(String source) {
        super(source);
        setLoop(true);
        setAutoPlay(true);
        setDoPickup(true);
        setFadeTime(1000);
        setFlag(MediaFlag.REGION);
    }

}
