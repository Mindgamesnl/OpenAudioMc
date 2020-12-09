package com.craftmend.openaudiomc.spigot.modules.speakers;


import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects.Vector3;
import com.craftmend.openaudiomc.generic.utils.TypeCounter;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.ApplicableSpeaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import lombok.AllArgsConstructor;
import org.bukkit.Location;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
public class SpeakerCollector {

    private SpeakerModule speakerModule;

    public Collection<ApplicableSpeaker> getApplicableSpeakers(Location location) {
        List<Speaker> applicableSpeakers = new ArrayList<>(speakerModule.getSpeakerMap().values());
        Collection<ApplicableSpeaker> speakers = new ArrayList<>();

        applicableSpeakers.removeIf(speaker -> !speaker.getLocation().getWorld().equals(location.getWorld().getName()));
        applicableSpeakers.removeIf(speaker -> speaker.getLocation().toBukkit().distance(location) > speaker.getRadius());

        applicableSpeakers.forEach(speaker -> {
            speakers.add(new ApplicableSpeaker(
                    speaker,
                    speaker.getSpeakerType(),
                    Vector3.from(speaker.getLocation())
            ));
        });

        return speakers;
    }

    public SpeakerType guessSpeakerType(Location location, String source) {
        Collection<ApplicableSpeaker> speakers = getApplicableSpeakers(location);
        speakers.removeIf(other -> !other.getSpeaker().getMedia().getSource().equals(source));
        TypeCounter<SpeakerType> typeCounter = new TypeCounter<>();

        for (ApplicableSpeaker speaker : speakers) {
            typeCounter.bumpCounter(speaker.getSpeakerType());
        }

        SpeakerType highest = typeCounter.getHighest();
        return highest == null ? SpeakerModule.DEFAULT_SPEAKER_TYPE : highest;
    }

}
