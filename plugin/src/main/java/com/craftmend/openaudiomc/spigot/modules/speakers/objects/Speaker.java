package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.speakers.BasicSpeaker;
import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.api.speakers.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.storm.api.markers.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@NoArgsConstructor
public class Speaker extends DataStore implements BasicSpeaker {

    @Column @Getter private String source;
    @Column @Getter private UUID speakerId;
    @Column @Setter @Getter private Integer radius;

    @Column(
            storeAsBlob = true
    )
    @Getter private MappedLocation location;

    @Column(
            storeAsBlob = true
    )
    @Setter @Getter private SpeakerType speakerType;

    @Column(
            storeAsBlob = true
    )
    @Getter private Set<ExtraSpeakerOptions> extraOptions = new HashSet<>();

    @Getter @Setter private Boolean validated = false;

    @Getter @Setter private transient boolean isRedstonePowered = false;

    public Speaker(String source, UUID id, int radius, MappedLocation location, SpeakerType speakerType, EnumSet<ExtraSpeakerOptions> options) {
        this.source = source;
        this.speakerId = id;
        this.radius = radius;
        this.location = location;
        this.speakerType = speakerType;
        this.extraOptions = options;
        fixEnumSet();
    }

    public void fixEnumSet() {
        Set<ExtraSpeakerOptions> fixedValues = new HashSet<>();
        for (Object extraOption : extraOptions) {
            if (extraOption instanceof String) {
                fixedValues.add(ExtraSpeakerOptions.valueOf((String) extraOption));
            } else {
                fixedValues.add((ExtraSpeakerOptions) extraOption);
            }
        }

        extraOptions = fixedValues;
    }

    public SpeakerMedia getMedia() {
        return OpenAudioMc.getService(SpeakerService.class).getMedia(source);
    }

}
