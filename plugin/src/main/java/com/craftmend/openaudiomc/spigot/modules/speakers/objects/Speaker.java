package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
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


    public Speaker(String source, UUID id, int radius, MappedLocation location, SpeakerType speakerType, Set<ExtraSpeakerOptions> options) {
        this.source = source;
        this.id = id;
        this.radius = radius;
        this.location = location;
        this.speakerType = speakerType;
        this.extraOptions = options;
    }

    public SpeakerMedia getMedia() {
        return OpenAudioMc.getService(SpeakerService.class).getMedia(source);
    }

}
