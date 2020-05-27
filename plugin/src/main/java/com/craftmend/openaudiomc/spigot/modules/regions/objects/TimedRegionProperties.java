package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.Bukkit;

public class TimedRegionProperties extends RegionProperties {

    private int task = -1;
    private String id;
    private Media media;

    public TimedRegionProperties(String source, int timeInSeconds, String id) {
        super(source, 100);
        this.id = id;

        this.task = Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMcSpigot.getInstance(), () -> {
            OpenAudioMcSpigot.getInstance().getRegionModule().removeRegion(this.id);
            forceUpdateClients();
        }, 20 * timeInSeconds);

        this.media = new RegionMedia(source, 100);
        this.media.setLoop(OpenAudioMc.getInstance().getConfigurationImplementation().getBoolean(StorageKey.SETTINGS_LOOP_TEMP_REGIONS));
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
