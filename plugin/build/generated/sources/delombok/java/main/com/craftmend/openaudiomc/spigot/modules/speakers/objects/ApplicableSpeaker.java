package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.openaudiomc.spigot.services.world.Vector3;

public class ApplicableSpeaker {
    private Speaker speaker;
    private SpeakerType speakerType;
    private Vector3 location;

    @Override
    public boolean equals(Object otherSpeaker) {
        if (!(otherSpeaker instanceof ApplicableSpeaker)) return false;
        ApplicableSpeaker other = (ApplicableSpeaker) otherSpeaker;
        return other.getLocation().equals(location) && speakerType.equals(other.getSpeakerType());
    }

    public Speaker getSpeaker() {
        return this.speaker;
    }

    public SpeakerType getSpeakerType() {
        return this.speakerType;
    }

    public Vector3 getLocation() {
        return this.location;
    }

    public void setSpeaker(final Speaker speaker) {
        this.speaker = speaker;
    }

    public void setSpeakerType(final SpeakerType speakerType) {
        this.speakerType = speakerType;
    }

    public void setLocation(final Vector3 location) {
        this.location = location;
    }

    public ApplicableSpeaker(final Speaker speaker, final SpeakerType speakerType, final Vector3 location) {
        this.speaker = speaker;
        this.speakerType = speakerType;
        this.location = location;
    }
}
