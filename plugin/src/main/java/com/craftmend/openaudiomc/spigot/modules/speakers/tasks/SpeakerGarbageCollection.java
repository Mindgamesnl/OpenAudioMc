package com.craftmend.openaudiomc.spigot.modules.speakers.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.GcStrategy;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.scheduler.BukkitRunnable;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SpeakerGarbageCollection extends BukkitRunnable {

    private SpeakerService speakerService;
    private final Set<Speaker> garbageSpeakers = new HashSet<Speaker>();
    private int lastFraction = 0;
    private final int FRACTION_GROUP_SIZE = 50;
    private boolean forceRun = false;

    public SpeakerGarbageCollection(SpeakerService speakerService) {
        this.speakerService = speakerService;
        runTaskTimer(OpenAudioMcSpigot.getInstance(), 600, 600);
    }

    public SpeakerGarbageCollection() {
        this.forceRun = true;
        this.speakerService = OpenAudioMc.getService(SpeakerService.class);
    }

    @Override
    public void run() {
        int maxFractions = forceRun ? 999999999 : roundUp(this.speakerService.getSpeakerMap().values().size(), FRACTION_GROUP_SIZE);

        // fraction logic to break computing into smaller parts
        int fractionStart = lastFraction * FRACTION_GROUP_SIZE;

        lastFraction++;
        if (maxFractions > lastFraction) {
            lastFraction = 0;
        }

        int setSize = this.speakerService.getSpeakerMap().values().size();
        possiblyFilterLimits(setSize,
                this.speakerService.getSpeakerMap().values().stream()
                        .filter(speaker -> !speaker.isValidated())
                        .skip(fractionStart)
        ).collect(Collectors.toList())
                .forEach(speaker -> {
                    MappedLocation mappedLocation = speaker.getLocation();

                    // check if the chunk is loaded, if not, don't do shit lmao
                    Location bukkitLocation = mappedLocation.toBukkit();

                    if (bukkitLocation == null || bukkitLocation.getWorld() == null || bukkitLocation.getChunk() == null) {
                        OpenAudioLogger.toConsole("Can't find world " + mappedLocation.getWorld() + " so speaker " + speaker.getId() + " is being deleted");
                        garbageSpeakers.add(speaker);
                    } else if (bukkitLocation.getChunk().isLoaded()) {
                        if (!SpeakerUtils.isSpeakerSkull(speaker.getLocation().getBlock())) {
                            garbageSpeakers.add(speaker);
                        } else {
                            speaker.setValidated(true);
                        }
                    }
                });

        if (!garbageSpeakers.isEmpty()) {
            Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> {
                for (Speaker garbageSpeaker : garbageSpeakers) {
                    speakerService.getSpeakerMap().remove(garbageSpeaker);
                }
            });

            GcStrategy strategy = GcStrategy.valueOf(StorageKey.SETTINGS_GC_STRATEGY.getString());
            if (strategy == GcStrategy.DELETE) {
                for (Speaker garbageSpeaker : garbageSpeakers) {
                    OpenAudioMc.getService(DatabaseService.class)
                            .getRepository(Speaker.class)
                            .delete(garbageSpeaker.getId().toString());
                    this.speakerService.getSpeakerMap().remove(garbageSpeaker.getLocation());
                }
            }

            OpenAudioLogger.toConsole("Found " + garbageSpeakers.size() + " corrupted speakers with the garbage collector.");
        }
        garbageSpeakers.clear();
    }

    private Stream<Speaker> possiblyFilterLimits(int size, Stream<Speaker> stream) {
        if (size > 250) {
            return stream.limit(FRACTION_GROUP_SIZE);
        }
        return stream;
    }

    public int roundUp(long num, long divisor) {
        int sign = (num > 0 ? 1 : -1) * (divisor > 0 ? 1 : -1);
        return (int) (sign * (Math.abs(num) + Math.abs(divisor) - 1) / Math.abs(divisor));
    }
}
