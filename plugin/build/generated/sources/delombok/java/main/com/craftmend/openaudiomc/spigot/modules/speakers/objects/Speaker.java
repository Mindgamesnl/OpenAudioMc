package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.speakers.BasicSpeaker;
import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.api.speakers.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.storm.api.markers.Column;
import java.time.Instant;
import java.util.*;

public class Speaker extends DataStore implements BasicSpeaker {
    @Column
    private String source;
    @Column
    private UUID speakerId;
    @Column
    private Boolean requiresHealthCheck = true;
    @Column
    private Integer radius;
    @Column(storeAsBlob = true)
    private MappedLocation location;
    @Column(storeAsBlob = true)
    private SpeakerType speakerType;
    @Column(storeAsBlob = true)
    private Set<ExtraSpeakerOptions> extraOptions = new HashSet<>();
    private Boolean validated = false;
    private transient boolean isRedstonePowered = false;
    private transient Instant lastRedstoneToggle = Instant.now();

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
        SpeakerMedia media = OpenAudioMc.getService(SpeakerService.class).getMedia(source);
        if (!ExtraSpeakerOptions.RESET_PLAYTHROUGH_ON_REDSTONE_LOSS.isEnabledFor(this)) {
            lastRedstoneToggle = Instant.ofEpochMilli(media.getStartInstant());
        }
        return media;
    }

    @Override
    public boolean isVirtual() {
        return !requiresHealthCheck;
    }

    @Override
    public void setVirtual(boolean value) {
        this.requiresHealthCheck = !value;
    }

    public Speaker() {
    }

    public String getSource() {
        return this.source;
    }

    public UUID getSpeakerId() {
        return this.speakerId;
    }

    public Boolean getRequiresHealthCheck() {
        return this.requiresHealthCheck;
    }

    public void setRadius(final Integer radius) {
        this.radius = radius;
    }

    public Integer getRadius() {
        return this.radius;
    }

    public MappedLocation getLocation() {
        return this.location;
    }

    public void setSpeakerType(final SpeakerType speakerType) {
        this.speakerType = speakerType;
    }

    public SpeakerType getSpeakerType() {
        return this.speakerType;
    }

    public Set<ExtraSpeakerOptions> getExtraOptions() {
        return this.extraOptions;
    }

    public Boolean getValidated() {
        return this.validated;
    }

    public void setValidated(final Boolean validated) {
        this.validated = validated;
    }

    public boolean isRedstonePowered() {
        return this.isRedstonePowered;
    }

    public void setRedstonePowered(final boolean isRedstonePowered) {
        this.isRedstonePowered = isRedstonePowered;
    }

    public Instant getLastRedstoneToggle() {
        return this.lastRedstoneToggle;
    }

    public void setLastRedstoneToggle(final Instant lastRedstoneToggle) {
        this.lastRedstoneToggle = lastRedstoneToggle;
    }
}
