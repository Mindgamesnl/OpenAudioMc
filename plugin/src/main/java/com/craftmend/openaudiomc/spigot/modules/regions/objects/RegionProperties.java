package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.storm.api.markers.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegionProperties extends DataStore {

    @Column private String source;
    @Column
    private Integer volume;
    @Column private Integer fadeTimeMs;
    @Column private Boolean allowsVoiceChat = true;
    @Column private String regionName;

    public void updateMedia(String regionName) {
        OpenAudioMcSpigot.getInstance().getRegionModule().removeRegionMedia(regionName, source);
        OpenAudioMcSpigot.getInstance().getRegionModule().getRegionPropertiesMap().put(regionName, this);
    }

    public Media getMedia() {
        return OpenAudioMcSpigot.getInstance().getRegionModule().getRegionMedia(source, volume, fadeTimeMs);
    }

}
