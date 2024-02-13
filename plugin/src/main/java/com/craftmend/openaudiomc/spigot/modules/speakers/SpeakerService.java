package com.craftmend.openaudiomc.spigot.modules.speakers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.api.speakers.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.services.world.interfaces.IRayTracer;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerSelectListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.*;
import com.craftmend.openaudiomc.spigot.modules.speakers.tasks.SpeakerGarbageCollection;
import com.craftmend.openaudiomc.spigot.services.world.tracing.DummyTracer;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerCreateListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerDestroyListener;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.*;
import org.bukkit.entity.Player;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@NoArgsConstructor
public class SpeakerService extends Service {

    @Inject
    private OpenAudioMcSpigot openAudioMcSpigot;

    @Inject
    private DatabaseService databaseService;

    @Getter private SpeakerCollector collector;

    public static final SpeakerType DEFAULT_SPEAKER_TYPE = SpeakerType.SPEAKER_3D;
    @Getter private final Map<MappedLocation, Speaker> speakerMap = new ConcurrentHashMap<>();
    private final Map<String, SpeakerMedia> speakerMediaMap = new ConcurrentHashMap<>();
    @Getter private Material playerSkullItem;
    @Getter private Material playerSkullBlock;
    @Getter private ServerVersion version;
    private final IRayTracer estimatedRayTracer = new DummyTracer();

    @Override
    public void onEnable() {
        openAudioMcSpigot.registerEvents(
                new SpeakerSelectListener(this),
                new SpeakerCreateListener(openAudioMcSpigot, this),
                new SpeakerDestroyListener(OpenAudioMc.getInstance(), this)
        );

        collector = new SpeakerCollector(this);

        initializeVersion();

        // load all apeakers
        for (Speaker speaker : databaseService.getRepository(Speaker.class).values()) {
            speaker.fixEnumSet(); // due to gson type guessing in storm
            registerSpeaker(speaker);
        }

        // setup garbage system
        new SpeakerGarbageCollection(this);

        // reset with new addon
        OpenAudioMc.getService(MediaService.class).getResetTriggers().add(() -> {
            speakerMediaMap.clear();
        });

        // tick redstone speakers
        if (StorageKey.SETTINGS_SPEAKER_REDSTONE_TICK_ENABLED.getBoolean()) {
            int interval = StorageKey.SETTINGS_SPEAKER_REDSTONE_TICK_INTERVAL.getInt();

            OpenAudioLogger.info("Starting redstone speaker tick task with interval " + interval + " ticks");

            Bukkit.getScheduler().scheduleAsyncRepeatingTask(OpenAudioMcSpigot.getInstance(), () -> {
                for (Speaker speaker : speakerMap.values()) {
                    // does this speaker have a redstone trigger?
                    if (!ExtraSpeakerOptions.REQUIRES_REDSTONE.isEnabledFor(speaker)) return;

                    // is the speakers chunk loaded?
                    World world = Bukkit.getWorld(speaker.getLocation().getWorld());
                    if (world == null) continue;
                    if (!world.isChunkLoaded(speaker.getLocation().getX() >> 4, speaker.getLocation().getZ() >> 4)) continue;

                    // is the speaker powered?
                    boolean poweredNow = world.getBlockAt(speaker.getLocation().getX(), speaker.getLocation().getY(), speaker.getLocation().getZ()).isBlockPowered();
                    boolean poweredBefore = speaker.isRedstonePowered();

                    // did it change?
                    if (poweredNow != poweredBefore) {
                        // update the speaker
                        speaker.setRedstonePowered(poweredNow);
                        if (ExtraSpeakerOptions.RESET_PLAYTHROUGH_ON_REDSTONE_LOSS.isEnabledFor(speaker)) speaker.getMedia().setStartInstant(System.currentTimeMillis());

                        // find nearby players
                        for (Player player : world.getPlayers()) {
                            if (player.getLocation().distance(speaker.getLocation().toBukkit()) > speaker.getRadius()) {
                                continue;
                            }

                            SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(player);
                            if (spigotConnection != null) {
                                spigotConnection.getSpeakerHandler().tick();
                            }
                        }
                    }
                }
            }, interval, interval);
        } else {
            OpenAudioLogger.info("Redstone speaker tick task is disabled");
        }
    }

    public IRayTracer getRayTracer() {
        // provide a default ray tracer, just use the simple one for now
        return estimatedRayTracer;
    }

    private void initializeVersion() {
        version = OpenAudioMc.getService(ServerService.class).getVersion();

        if (version == ServerVersion.MODERN) {
            OpenAudioLogger.info("Enabling the 1.13 speaker system");
            playerSkullItem = Material.PLAYER_HEAD;
            playerSkullBlock = Material.PLAYER_HEAD;
        } else {
            OpenAudioLogger.info("Enabling the 1.12 speaker system");
            try {
                OpenAudioLogger.info("Hooking speakers attempt 1..");
                playerSkullItem = Material.valueOf("SKULL_ITEM");
                playerSkullBlock = Material.valueOf("SKULL");
            } catch (Exception e) {
                OpenAudioLogger.info("Failed hook speakers attempt 1..");
            }

            if (playerSkullItem == null) {
                OpenAudioLogger.info("Speakers failed to hook. Hooking to a block.");
                playerSkullItem = Material.JUKEBOX;
                playerSkullBlock = Material.JUKEBOX;
            }
        }
    }

    public Speaker registerSpeaker(Speaker speaker) {
        if (speaker.getLocation() == null) {
            OpenAudioLogger.warn("Registering speaker with nil location " + speaker.getSpeakerId());
        }
        speakerMap.put(speaker.getLocation(), speaker);
        return speaker;
    }

    public Speaker getSpeaker(MappedLocation location) {
        return speakerMap.get(location);
    }

    public SpeakerMedia getMedia(String source) {
        if (speakerMediaMap.containsKey(source)) return speakerMediaMap.get(source);
        SpeakerMedia speakerMedia = new SpeakerMedia(source);
        speakerMediaMap.put(source, speakerMedia);
        return speakerMedia;
    }

    public void unlistSpeaker(MappedLocation location) {
        speakerMap.remove(location);
    }
}
