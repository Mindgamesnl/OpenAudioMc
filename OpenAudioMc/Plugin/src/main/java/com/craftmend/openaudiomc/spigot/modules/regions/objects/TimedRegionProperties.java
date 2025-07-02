package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.regions.registry.WorldRegionManager;
import com.craftmend.storm.api.markers.Column;
import com.craftmend.storm.api.markers.Table;
import org.bukkit.Bukkit;


@Table(name = "timed_region_properties")
public class TimedRegionProperties extends RegionProperties {

    private int task = -1;
    @Column
    private String regionId;
    private Media media;

    public TimedRegionProperties() {

    }

    public TimedRegionProperties(String source, int timeInSeconds, String regionId, String... worldName) {
        this(source, timeInSeconds, regionId, 100, 1000, regionId, worldName);
    }

    public TimedRegionProperties(String source, int timeInSeconds, String regionId, int volume, int fadeTimeMs, String regionName, String... worldName) {
        super(source, volume, fadeTimeMs, true, regionName, worldName);
        this.regionId = regionId;

        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            this.task = Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMcSpigot.getInstance(), () -> {

                // remove myself from all my worlds
                for (String world : getWorlds()) {
                    OpenAudioMcSpigot.getInstance().getRegionModule().getWorld(world).unregisterRegion(this.regionId);
                }
            }, 20 * timeInSeconds);

            forceUpdateClients();

            // force initialize media the media
            getOrStartMedia();
        }
    }

    private void forceUpdateClients() {
        OpenAudioMc.getService(SpigotPlayerService.class).getClients()
                .stream()
                .filter(client -> client.getRegions().stream().anyMatch(region -> region.getId().equals(regionId)))
                .forEach(client -> client.getLocationDataWatcher().forceTicK());
    }

    public void destroy() {
        Bukkit.getScheduler().cancelTask(task);
        forceUpdateClients();
    }

    public Media getOrStartMedia() {
        // temp regions always use their own media, as it shouldn't sync with others
        if (media == null) {
            this.media = new RegionMedia(getSource(), getVolume(), getFadeTimeMs(), true);
            this.media.setLoop(false);
        }
        return this.media;
    }

    @Override
    public Media getMediaForWorld(String worldName) {
        return getOrStartMedia();
    }

    @Override
    public Media getMediaForWorld(WorldRegionManager worldRegionManager) {
        return getOrStartMedia();
    }

}
