package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.media.objects.Media;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegionProperties extends DataStore {

    private String source;
    private int volume;
    private int fadeTimeMs;
    private boolean allowsVoiceChat = true;
    private String regionName;

    public void updateMedia(String regionName) {
        OpenAudioMcSpigot.getInstance().getRegionModule().removeRegionMedia(regionName, source);
        OpenAudioMcSpigot.getInstance().getRegionModule().getRegionPropertiesMap().put(regionName, this);
    }

    public Media getMedia() {
        return OpenAudioMcSpigot.getInstance().getRegionModule().getRegionMedia(source, volume, fadeTimeMs);
    }

}
