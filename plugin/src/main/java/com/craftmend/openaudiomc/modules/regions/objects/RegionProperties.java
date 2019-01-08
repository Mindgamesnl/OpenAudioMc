package com.craftmend.openaudiomc.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.media.objects.Media;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegionProperties {

    private String source;

    public Media getMedia() {
        return OpenAudioMc.getInstance().getRegionModule().getRegionMedia(source);
    }

}
