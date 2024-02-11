package com.craftmend.openaudiomc.spigot.modules.speakers;


import com.craftmend.openaudiomc.api.speakers.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.spigot.services.world.Vector3;
import com.craftmend.openaudiomc.generic.utils.data.TypeCounter;
import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.ApplicableSpeaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import lombok.AllArgsConstructor;
import org.bukkit.Location;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
public class SpeakerCollector {

    private SpeakerService speakerService;

    public Collection<ApplicableSpeaker> getApplicableSpeakers(Location location, boolean safe) {
        List<Speaker> applicableSpeakers = new ArrayList<>(speakerService.getSpeakerMap().values());
        Collection<ApplicableSpeaker> speakers = new ArrayList<>();

        applicableSpeakers.removeIf(speaker -> {
            if (speaker == null) return true;
            if (speaker.getLocation() == null && !safe) return true;
            if (!speaker.getLocation().getWorld().equals(location.getWorld().getName())) return true;
            if (speaker.getLocation().toBukkit().distance(location) > speaker.getRadius()) return true;
            if (ExtraSpeakerOptions.REQUIRES_REDSTONE.isEnabledFor(speaker) && speaker.getLocation().toBukkit().getChunk().isLoaded() && !speaker.getLocation().toBukkit().getBlock().isBlockPowered()) return true;
            return false;
        });

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
        Collection<ApplicableSpeaker> speakers = getApplicableSpeakers(location, true);
        speakers.removeIf(other -> !other.getSpeaker().getMedia().getSource().equals(source));
        TypeCounter<SpeakerType> typeCounter = new TypeCounter<>();

        for (ApplicableSpeaker speaker : speakers) {
            typeCounter.bumpCounter(speaker.getSpeakerType());
        }

        SpeakerType highest = typeCounter.getHighest();
        return highest == null ? SpeakerService.DEFAULT_SPEAKER_TYPE : highest;
    }

}
