package com.craftmend.oamapmigrator.database.models;

import com.craftmend.oamapmigrator.database.internal.LegacyStore;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.api.speakers.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.SpeakerMedia;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class Speaker extends LegacyStore {

    @Getter private String source;
    @Getter private UUID id;
    @Setter @Getter private int radius;
    @Getter private MappedLocation location;
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
