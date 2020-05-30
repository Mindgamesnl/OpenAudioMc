package com.craftmend.openaudiomc.spigot.modules.speakers.tasks;

import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import org.bukkit.Location;
import org.bukkit.scheduler.BukkitRunnable;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class SpeakerGarbageCollection extends BukkitRunnable {

    private SpeakerModule speakerModule;

    public SpeakerGarbageCollection(SpeakerModule speakerModule) {
        this.speakerModule = speakerModule;
        runTaskTimer(OpenAudioMcSpigot.getInstance(), 600, 600);
    }

    @Override
    public void run() {
        Set<MappedLocation> garbageSpeakers = new HashSet<>();

        for (Map.Entry<MappedLocation, Speaker> entry : this.speakerModule.getSpeakerMap().entrySet()) {
            MappedLocation mappedLocation = entry.getKey();
            Speaker speaker = entry.getValue();

            // check if the chunk is loaded, if not, don't do shit lmao
            Location bukkitLocation = mappedLocation.toBukkit();
            if (bukkitLocation.getChunk().isLoaded()) {
                if (!SpeakerUtils.isSpeakerSkull(speaker.getLocation().getBlock())) {
                    garbageSpeakers.add(mappedLocation);
                }
            }
        }

        if (!garbageSpeakers.isEmpty()) {
            OpenAudioLogger.toConsole("Found " + garbageSpeakers.size() + " dead speakers with the garbage collector. Removing them.");
            for (MappedLocation garbageSpeaker : garbageSpeakers) {
                speakerModule.getSpeakerMap().remove(garbageSpeaker);
            }
        }
    }
}
