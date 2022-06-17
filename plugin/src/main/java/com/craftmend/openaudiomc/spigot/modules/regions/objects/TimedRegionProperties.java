package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
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

    public TimedRegionProperties(String source, int timeInSeconds, String regionId) {
        this(source, timeInSeconds, regionId, 100, 1000, regionId);
    }

    public TimedRegionProperties(String source, int timeInSeconds, String regionId, int volume, int fadeTimeMs, String regionName) {
        super(source, volume, fadeTimeMs, true, regionName);
        this.regionId = regionId;

        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            this.task = Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMcSpigot.getInstance(), () -> {
                OpenAudioMcSpigot.getInstance().getRegionModule().removeRegion(this.regionId);
                forceUpdateClients();
            }, 20 * timeInSeconds);
            forceUpdateClients();
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

    @Override
    public Media getMedia() {

        if (media == null) {
            this.media = new RegionMedia(getSource(), getVolume(), getFadeTimeMs());
            this.media.setLoop(false);
        }

        return this.media;
    }

}
