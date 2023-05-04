package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.utils.data.ArrayUtil;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import com.craftmend.storm.api.markers.Column;
import lombok.*;

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
    @Column(storeAsBlob = true) private String[] worlds;

    @Column(defaultValue = "true") private Boolean loop = true;

    // Omit this field from lombok as it may be null, due to the boxed status
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @Column private Boolean hasWorlds = false;

    public RegionProperties(String source, int volume, int fadeTimeMs, boolean allowsVoiceChat, String regionName, String... worldNames) {
        this.source = source;
        this.volume = volume;
        this.fadeTimeMs = fadeTimeMs;
        this.allowsVoiceChat = allowsVoiceChat;
        this.regionName = regionName;
        worldNames = ArrayUtil.removeNullValues(worldNames);
        this.hasWorlds = worldNames.length > 0;
        this.worlds = worldNames;
    }

    public Media getMediaForWorld(WorldRegionManager worldRegionManager) {
        return worldRegionManager.getRegionMedia(source, volume, fadeTimeMs, loop);
    }

    public boolean hasWorlds() {
        if (worlds == null) return false;
        return hasWorlds;
    }

    public Media getMediaForWorld(String worldName) {
        return getMediaForWorld(OpenAudioMcSpigot.getInstance().getRegionModule().getWorld(worldName));
    }

}
