package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public class Speaker {

    @Getter private String source;
    @Getter private UUID id;
    @Setter @Getter private int radius;
    @Getter private MappedLocation location;
    @Setter @Getter private SpeakerType speakerType;
    @Getter @Setter private boolean validated = false;

    public Speaker(String source, UUID id, int radius, MappedLocation location, SpeakerType speakerType) {
        this.source = source;
        this.id = id;
        this.radius = radius;
        this.location = location;
        this.speakerType = speakerType;
    }

    public SpeakerMedia getMedia() {
        return OpenAudioMcSpigot.getInstance().getSpeakerModule().getMedia(source);
    }

}
