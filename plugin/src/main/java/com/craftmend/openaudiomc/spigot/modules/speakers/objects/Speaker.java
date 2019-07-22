package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Getter;

import java.util.UUID;

public class Speaker {

    @Getter private String source;
    @Getter private UUID id;
    @Getter private int radius;
    @Getter private MappedLocation location;

    public Speaker(String source, UUID id, int radius, MappedLocation location) {
        this.source = source;
        this.id = id;
        this.radius = radius;
        this.location = location;
    }

    public SpeakerMedia getMedia() {
        return OpenAudioMc.getInstance().getSpeakerModule().getMedia(source);
    }

}
