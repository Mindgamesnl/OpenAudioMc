package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.generic.networking.payloads.out.speakers.objects.Vector3;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicableSpeaker {

    private int distance;
    private Speaker speaker;
    private SpeakerType speakerType;
    private Vector3 location;

    @Override
    public boolean equals(Object otherSpeaker) {
        if (!(otherSpeaker instanceof ApplicableSpeaker)) return false;
        ApplicableSpeaker other = (ApplicableSpeaker) otherSpeaker;
        return other.getLocation().equals(location) && speakerType.equals(other.getSpeakerType());
    }

}
