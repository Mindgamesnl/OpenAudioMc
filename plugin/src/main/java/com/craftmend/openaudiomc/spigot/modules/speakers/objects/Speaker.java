package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class Speaker {

    @Getter private final String source;
    @Getter private final UUID id;
    @Setter @Getter private int radius;
    @Getter private final MappedLocation location;
    @Setter @Getter private SpeakerType speakerType;
    @Getter private Set<ExtraSpeakerOptions> extraOptions = new HashSet<>();
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
