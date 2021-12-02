package com.craftmend.openaudiomc.spigot.modules.speakers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.services.world.interfaces.IRayTracer;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerSelectListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.*;
import com.craftmend.openaudiomc.spigot.modules.speakers.tasks.SpeakerGarbageCollection;
import com.craftmend.openaudiomc.spigot.services.world.tracing.EstimatedRayTracer;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerCreateListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerDestroyListener;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.*;

import java.util.*;

@NoArgsConstructor
public class SpeakerService extends Service {

    @Inject
    private OpenAudioMcSpigot openAudioMcSpigot;

    @Inject
    private DatabaseService databaseService;

    @Getter private SpeakerCollector collector;

    public static final SpeakerType DEFAULT_SPEAKER_TYPE = SpeakerType.SPEAKER_3D;
    @Getter private final Map<MappedLocation, Speaker> speakerMap = new HashMap<>();
    private final Map<String, SpeakerMedia> speakerMediaMap = new HashMap<>();
    @Getter private Material playerSkullItem;
    @Getter private Material playerSkullBlock;
    @Getter private final Map<String, Set<QueuedSpeaker>> waitingWorlds = new HashMap<>();
    @Getter private ServerVersion version;

    private final EstimatedRayTracer estimatedRayTracer = new EstimatedRayTracer();

    @Override
    public void onEnable() {
        openAudioMcSpigot.registerEvents(
                new SpeakerSelectListener(this),
                new SpeakerCreateListener(openAudioMcSpigot, this),
                new SpeakerDestroyListener(OpenAudioMc.getInstance(), this)
        );

        collector = new SpeakerCollector(this);

        initializeVersion();

        OpenAudioLogger.toConsole("There are " + OpenAudioMc.getService(DatabaseService.class).getRepository(Speaker.class).size() + " speakers in the new database");

        // load all apeakers
        for (Speaker speaker : databaseService.getRepository(Speaker.class).values()) {
            registerSpeaker(speaker);
        }

        // setup garbage system
        new SpeakerGarbageCollection(this);

        // reset with new addon
        OpenAudioMc.getService(MediaService.class).getResetTriggers().add(() -> {
            speakerMediaMap.clear();
        });
    }

    public IRayTracer getRayTracer() {
        // provide a default ray tracer, just use the simple one for now
        return estimatedRayTracer;
    }

    private void initializeVersion() {
        version = OpenAudioMc.getService(ServerService.class).getVersion();

        if (version == ServerVersion.MODERN) {
            OpenAudioLogger.toConsole("Enabling the 1.13 speaker system");
            playerSkullItem = Material.PLAYER_HEAD;
            playerSkullBlock = Material.PLAYER_HEAD;
        } else {
            OpenAudioLogger.toConsole("Enabling the 1.12 speaker system");
            try {
                OpenAudioLogger.toConsole("Hooking speakers attempt 1..");
                playerSkullItem = Material.valueOf("SKULL_ITEM");
                playerSkullBlock = Material.valueOf("SKULL");
            } catch (Exception e) {
                OpenAudioLogger.toConsole("Failed hook speakers attempt 1..");
            }

            if (playerSkullItem == null) {
                OpenAudioLogger.toConsole("Speakers failed to hook. Hooking to a block.");
                playerSkullItem = Material.JUKEBOX;
                playerSkullBlock = Material.JUKEBOX;
            }
        }
    }

    public Speaker registerSpeaker(Speaker speaker) {
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
