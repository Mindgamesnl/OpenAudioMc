package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.media.objects.Media;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegionProperties {

    private String source;
    private int volume;

    public void updateMedia(String regionName) {
        OpenAudioMcSpigot.getInstance().getRegionModule().removeRegionMedia(regionName, source);
        OpenAudioMcSpigot.getInstance().getRegionModule().getRegionPropertiesMap().put(regionName, this);

    }

    public Media getMedia() {
        return OpenAudioMcSpigot.getInstance().getRegionModule().getRegionMedia(source, volume);
    }

}
