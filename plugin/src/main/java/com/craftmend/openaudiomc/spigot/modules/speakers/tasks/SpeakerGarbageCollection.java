package com.craftmend.openaudiomc.spigot.modules.speakers.tasks;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.scheduler.BukkitRunnable;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class SpeakerGarbageCollection extends BukkitRunnable {

    private final SpeakerModule speakerModule;
    private final Set<MappedLocation> garbageSpeakers = new HashSet<>();
    private int lastFraction = 0;
    private final int FRACTION_GROUP_SIZE = 50;

    public SpeakerGarbageCollection(SpeakerModule speakerModule) {
        this.speakerModule = speakerModule;
        runTaskTimer(OpenAudioMcSpigot.getInstance(), 600, 600);
    }

    @Override
    public void run() {
        int maxFractions = roundUp(this.speakerModule.getSpeakerMap().values().size(), FRACTION_GROUP_SIZE);
        if (!garbageSpeakers.isEmpty()) {
            OpenAudioLogger.toConsole("Found " + garbageSpeakers.size() + " corrupted speakers with the garbage collector. Removing them from the cache until the server restarts (pass " + lastFraction + " out of " + maxFractions + "))");
            for (MappedLocation garbageSpeaker : garbageSpeakers) {
                Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> speakerModule.getSpeakerMap().remove(garbageSpeaker));

            }
        }
        garbageSpeakers.clear();

        // fraction logic to break computing into smaller parts
        int fractionStart = lastFraction *  FRACTION_GROUP_SIZE;

        lastFraction++;
        if (maxFractions > lastFraction) {
            lastFraction = 0;
        }

        this.speakerModule.getSpeakerMap().values().stream()
                .filter(speaker -> !speaker.isValidated())
                .skip(fractionStart)
                .limit(FRACTION_GROUP_SIZE)
                .collect(Collectors.toList())
                .forEach(speaker -> {
                    MappedLocation mappedLocation = speaker.getLocation();

                    // check if the chunk is loaded, if not, don't do shit lmao
                    Location bukkitLocation = mappedLocation.toBukkit();
                    if (bukkitLocation.getChunk().isLoaded()) {
                        if (!SpeakerUtils.isSpeakerSkull(speaker.getLocation().getBlock())) {
                            garbageSpeakers.add(mappedLocation);
                        } else {
                            speaker.setValidated(true);
                        }
                    }
                });
    }

    public int roundUp(long num, long divisor) {
        int sign = (num > 0 ? 1 : -1) * (divisor > 0 ? 1 : -1);
        return (int) (sign * (Math.abs(num) + Math.abs(divisor) - 1) / Math.abs(divisor));
    }
}
