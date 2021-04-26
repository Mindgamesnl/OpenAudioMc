package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.Bukkit;

public class TimedRegionProperties extends RegionProperties {

    private int task = -1;
    private String id;
    private Media media;

    public TimedRegionProperties(String source, int timeInSeconds, String id) {
        this(source, timeInSeconds, id, 100, 1000);
    }

    public TimedRegionProperties(String source, int timeInSeconds, String id, int volume, int fadeTimeMs) {
        super(source, volume, fadeTimeMs);
        this.id = id;

        this.task = Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMcSpigot.getInstance(), () -> {
            OpenAudioMcSpigot.getInstance().getRegionModule().removeRegion(this.id);
            forceUpdateClients();
        }, 20 * timeInSeconds);

        this.media = new RegionMedia(source, volume, fadeTimeMs);
        this.media.setLoop(false);
        forceUpdateClients();
    }

    private void forceUpdateClients() {
        OpenAudioMcSpigot.getInstance().getPlayerModule().getClients()
                .stream()
                .filter(client -> client.getRegions().stream().anyMatch(region -> region.getId().equals(id)))
                .forEach(client -> client.getLocationDataWatcher().forceTicK());
    }

    public void destroy() {
        Bukkit.getScheduler().cancelTask(task);
        forceUpdateClients();
    }

    @Override
    public Media getMedia() {
        return this.media;
    }

}
