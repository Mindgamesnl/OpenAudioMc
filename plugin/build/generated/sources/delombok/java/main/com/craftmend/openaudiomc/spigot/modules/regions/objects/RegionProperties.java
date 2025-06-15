package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.data.ArrayUtil;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import com.craftmend.storm.api.markers.Column;
import lombok.*;

public class RegionProperties extends DataStore {
    @Column
    private String source;
    @Column
    private Integer volume;
    @Column
    private Integer fadeTimeMs;
    @Column
    private Boolean allowsVoiceChat = true;
    // setting this to true will pull the config value instead
    @Column
    private Boolean doSync = true;
    @Column
    private String regionName;
    @Column(storeAsBlob = true)
    private String[] worlds;
    @Column
    private Boolean loop = true;
    // Omit this field from lombok as it may be null, due to the boxed status
    @Column
    private Boolean hasWorlds = false;

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
        if (loop == null) loop = true;
        Media media = worldRegionManager.getRegionMedia(source, volume, fadeTimeMs, loop);
        media.setDoPickup(this.doSync);
        // is region sync explicitly disabled?
        if (!StorageKey.SETTINGS_REGIONS_SYNC.getBoolean()) {
            media.setDoPickup(false);
        }
        media.setFadeTime(fadeTimeMs);
        return media;
    }

    public boolean hasWorlds() {
        if (worlds == null) return false;
        return hasWorlds;
    }

    public Media getMediaForWorld(String worldName) {
        return getMediaForWorld(OpenAudioMcSpigot.getInstance().getRegionModule().getWorld(worldName));
    }

    public String getSource() {
        return this.source;
    }

    public Integer getVolume() {
        return this.volume;
    }

    public Integer getFadeTimeMs() {
        return this.fadeTimeMs;
    }

    public Boolean getAllowsVoiceChat() {
        return this.allowsVoiceChat;
    }

    public Boolean getDoSync() {
        return this.doSync;
    }

    public String getRegionName() {
        return this.regionName;
    }

    public String[] getWorlds() {
        return this.worlds;
    }

    public Boolean getLoop() {
        return this.loop;
    }

    public void setSource(final String source) {
        this.source = source;
    }

    public void setVolume(final Integer volume) {
        this.volume = volume;
    }

    public void setFadeTimeMs(final Integer fadeTimeMs) {
        this.fadeTimeMs = fadeTimeMs;
    }

    public void setAllowsVoiceChat(final Boolean allowsVoiceChat) {
        this.allowsVoiceChat = allowsVoiceChat;
    }

    public void setDoSync(final Boolean doSync) {
        this.doSync = doSync;
    }

    public void setRegionName(final String regionName) {
        this.regionName = regionName;
    }

    public void setWorlds(final String[] worlds) {
        this.worlds = worlds;
    }

    public void setLoop(final Boolean loop) {
        this.loop = loop;
    }

    @Override
    public String toString() {
        return "RegionProperties(source=" + this.getSource() + ", volume=" + this.getVolume() + ", fadeTimeMs=" + this.getFadeTimeMs() + ", allowsVoiceChat=" + this.getAllowsVoiceChat() + ", doSync=" + this.getDoSync() + ", regionName=" + this.getRegionName() + ", worlds=" + java.util.Arrays.deepToString(this.getWorlds()) + ", loop=" + this.getLoop() + ", hasWorlds=" + this.hasWorlds + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof RegionProperties)) return false;
        final RegionProperties other = (RegionProperties) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$volume = this.getVolume();
        final Object other$volume = other.getVolume();
        if (this$volume == null ? other$volume != null : !this$volume.equals(other$volume)) return false;
        final Object this$fadeTimeMs = this.getFadeTimeMs();
        final Object other$fadeTimeMs = other.getFadeTimeMs();
        if (this$fadeTimeMs == null ? other$fadeTimeMs != null : !this$fadeTimeMs.equals(other$fadeTimeMs)) return false;
        final Object this$allowsVoiceChat = this.getAllowsVoiceChat();
        final Object other$allowsVoiceChat = other.getAllowsVoiceChat();
        if (this$allowsVoiceChat == null ? other$allowsVoiceChat != null : !this$allowsVoiceChat.equals(other$allowsVoiceChat)) return false;
        final Object this$doSync = this.getDoSync();
        final Object other$doSync = other.getDoSync();
        if (this$doSync == null ? other$doSync != null : !this$doSync.equals(other$doSync)) return false;
        final Object this$loop = this.getLoop();
        final Object other$loop = other.getLoop();
        if (this$loop == null ? other$loop != null : !this$loop.equals(other$loop)) return false;
        final Object this$hasWorlds = this.hasWorlds;
        final Object other$hasWorlds = other.hasWorlds;
        if (this$hasWorlds == null ? other$hasWorlds != null : !this$hasWorlds.equals(other$hasWorlds)) return false;
        final Object this$source = this.getSource();
        final Object other$source = other.getSource();
        if (this$source == null ? other$source != null : !this$source.equals(other$source)) return false;
        final Object this$regionName = this.getRegionName();
        final Object other$regionName = other.getRegionName();
        if (this$regionName == null ? other$regionName != null : !this$regionName.equals(other$regionName)) return false;
        if (!java.util.Arrays.deepEquals(this.getWorlds(), other.getWorlds())) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof RegionProperties;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $volume = this.getVolume();
        result = result * PRIME + ($volume == null ? 43 : $volume.hashCode());
        final Object $fadeTimeMs = this.getFadeTimeMs();
        result = result * PRIME + ($fadeTimeMs == null ? 43 : $fadeTimeMs.hashCode());
        final Object $allowsVoiceChat = this.getAllowsVoiceChat();
        result = result * PRIME + ($allowsVoiceChat == null ? 43 : $allowsVoiceChat.hashCode());
        final Object $doSync = this.getDoSync();
        result = result * PRIME + ($doSync == null ? 43 : $doSync.hashCode());
        final Object $loop = this.getLoop();
        result = result * PRIME + ($loop == null ? 43 : $loop.hashCode());
        final Object $hasWorlds = this.hasWorlds;
        result = result * PRIME + ($hasWorlds == null ? 43 : $hasWorlds.hashCode());
        final Object $source = this.getSource();
        result = result * PRIME + ($source == null ? 43 : $source.hashCode());
        final Object $regionName = this.getRegionName();
        result = result * PRIME + ($regionName == null ? 43 : $regionName.hashCode());
        result = result * PRIME + java.util.Arrays.deepHashCode(this.getWorlds());
        return result;
    }

    public RegionProperties() {
    }

    public RegionProperties(final String source, final Integer volume, final Integer fadeTimeMs, final Boolean allowsVoiceChat, final Boolean doSync, final String regionName, final String[] worlds, final Boolean loop, final Boolean hasWorlds) {
        this.source = source;
        this.volume = volume;
        this.fadeTimeMs = fadeTimeMs;
        this.allowsVoiceChat = allowsVoiceChat;
        this.doSync = doSync;
        this.regionName = regionName;
        this.worlds = worlds;
        this.loop = loop;
        this.hasWorlds = hasWorlds;
    }
}
