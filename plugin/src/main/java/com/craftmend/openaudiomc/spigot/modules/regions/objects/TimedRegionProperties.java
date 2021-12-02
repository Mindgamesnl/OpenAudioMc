package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import org.bukkit.Bukkit;

public class TimedRegionProperties extends RegionProperties {

    private int task = -1;
    private final String id;
    private final Media media;

    public TimedRegionProperties(String source, int timeInSeconds, String id) {
        this(source, timeInSeconds, id, 100, 1000, id);
    }

    public TimedRegionProperties(String source, int timeInSeconds, String id, int volume, int fadeTimeMs, String regionName) {
        super(source, volume, fadeTimeMs, true, regionName);
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
        OpenAudioMc.getService(SpigotPlayerService.class).getClients()
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
