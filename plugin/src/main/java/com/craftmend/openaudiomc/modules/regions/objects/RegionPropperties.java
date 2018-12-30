package com.craftmend.openaudiomc.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.media.objects.Media;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class RegionPropperties {

    private String mediaSrouce;

    public Media getMedia() {
        return OpenAudioMc.getInstance().getRegionModule().getRegionMedia(mediaSrouce);
    }

}
