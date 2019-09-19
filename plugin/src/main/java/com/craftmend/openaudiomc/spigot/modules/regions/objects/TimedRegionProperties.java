package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.Bukkit;

public class TimedRegionProperties extends RegionProperties {

    private int task = -1;
    private String id;
    private Media media;

    public TimedRegionProperties(String source, int timeInSeconds, String id) {
        super(source);
        this.id = id;

        this.task = Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMcSpigot.getInstance(), () -> {
            OpenAudioMcSpigot.getInstance().getRegionModule().removeRegion(this.id);
        }, 20 * timeInSeconds);

        this.media = new RegionMedia(source);
    }

    @Override
    public Media getMedia() {
        return this.media;
    }
}
