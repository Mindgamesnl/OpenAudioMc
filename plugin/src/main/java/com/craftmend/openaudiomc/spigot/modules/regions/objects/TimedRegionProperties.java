package com.craftmend.openaudiomc.spigot.modules.regions.objects;

import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;

public class TimedRegionProperties extends RegionProperties {

    private String id;
    private Media media;

    public TimedRegionProperties(String source, String id) {
        super(source, 100);
        this.id = id;
        this.media = new RegionMedia(source, 100);
        this.media.setLoop(false);
        forceUpdateClients();
    }

    private void forceUpdateClients() {
        OpenAudioMcSpigot.getInstance().getPlayerModule().getClients()
                .stream()
                .filter(client -> client.getRegions().stream().anyMatch(region -> region.getId().equals(id)))
                .forEach(client -> client.getLocationDataWatcher().forceTicK());
    }

    @Override
    public Media getMedia() {
        return this.media;
    }

}
