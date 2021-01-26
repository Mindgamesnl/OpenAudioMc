package com.craftmend.openaudiomc.spigot.modules.speakers.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.GcStrategy;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;
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

    private final SpeakerModule speakerModule;
    private final Set<MappedLocation> garbageSpeakers = new HashSet<>();
    private int lastFraction = 0;
    private final int FRACTION_GROUP_SIZE = 50;
    private int logInterval = -1;
    private int toReport = 0;

    public SpeakerGarbageCollection(SpeakerModule speakerModule) {
        this.speakerModule = speakerModule;
        runTaskTimer(OpenAudioMcSpigot.getInstance(), 600, 600);
    }

    @Override
    public void run() {
        int maxFractions = roundUp(this.speakerModule.getSpeakerMap().values().size(), FRACTION_GROUP_SIZE);
        if (!garbageSpeakers.isEmpty()) {

            toReport += garbageSpeakers.size();
            logInterval++;
            if (logInterval > 20 && toReport > 0) {
                OpenAudioLogger.toConsole("Found " + toReport + " corrupted speakers with the garbage collector. Removing them from the cache until the server restarts (pass " + lastFraction + " out of " + maxFractions + "))");
                toReport = 0;
                logInterval = 0;
            }

            Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> {
                for (MappedLocation garbageSpeaker : garbageSpeakers) {
                    speakerModule.getSpeakerMap().remove(garbageSpeaker);
                }
            });

            GcStrategy strategy = GcStrategy.valueOf(StorageKey.SETTINGS_GC_STRATEGY.getString());
            if (strategy == GcStrategy.DELETE) {
                OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
                for (MappedLocation garbageSpeaker : garbageSpeakers) {
                    Speaker speaker = this.speakerModule.getSpeaker(garbageSpeaker);
                    openAudioMc.getConfiguration().setString(StorageLocation.CONFIG_FILE, "speakers." + speaker.getId().toString() + ".type", null);
                    openAudioMc.getConfiguration().setString(StorageLocation.CONFIG_FILE, "speakers." + speaker.getId().toString() + ".radius", null);
                    openAudioMc.getConfiguration().setString(StorageLocation.CONFIG_FILE, "speakers." + speaker.getId().toString() + ".world", null);
                    openAudioMc.getConfiguration().setString(StorageLocation.CONFIG_FILE, "speakers." + speaker.getId().toString() + ".x", null);
                    openAudioMc.getConfiguration().setString(StorageLocation.CONFIG_FILE, "speakers." + speaker.getId().toString() + ".y", null);
                    openAudioMc.getConfiguration().setString(StorageLocation.CONFIG_FILE, "speakers." + speaker.getId().toString() + ".z", null);
                    openAudioMc.getConfiguration().setString(StorageLocation.CONFIG_FILE, "speakers." + speaker.getId().toString() + ".media", null);
                    openAudioMc.getConfiguration().setString(StorageLocation.CONFIG_FILE, "speakers." + speaker.getId().toString(), null);
                }
                openAudioMc.getConfiguration().saveAll();
            }
        }
        garbageSpeakers.clear();

        // fraction logic to break computing into smaller parts
        int fractionStart = lastFraction * FRACTION_GROUP_SIZE;

        lastFraction++;
        if (maxFractions > lastFraction) {
            lastFraction = 0;
        }

        int setSize = this.speakerModule.getSpeakerMap().values().size();
        possiblyFilterLimits(setSize,
                this.speakerModule.getSpeakerMap().values().stream()
                        .filter(speaker -> !speaker.isValidated())
                        .skip(fractionStart)
        ).collect(Collectors.toList())
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
