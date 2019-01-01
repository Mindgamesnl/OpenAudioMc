package com.craftmend.openaudiomc.modules.speakers.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Getter;

import java.util.UUID;

public class Speaker {

    @Getter private String source;
    @Getter private UUID id;
    @Getter private int radius;
    @Getter private SimpleLocation location;

    public Speaker(String source, UUID id, int radius, SimpleLocation location) {
        this.source = source;
        this.id = id;
        this.radius = radius;
        this.location = location;
    }

    public void save(SimpleLocation location) {
        OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".world", location.getWorld());
        OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".x", location.getX());
        OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".y", location.getY());
        OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".z", location.getZ());
        OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".radius", 10);
        OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".media", source);
        OpenAudioMc.getInstance().getSpeakerModule().registerSpeaker(location, source, id, radius);
    }

    public SpeakerMedia getMedia() {
        return OpenAudioMc.getInstance().getSpeakerModule().getMedia(source);
    }

}
