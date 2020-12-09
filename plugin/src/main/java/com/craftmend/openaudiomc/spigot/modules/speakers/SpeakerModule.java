package com.craftmend.openaudiomc.spigot.modules.speakers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.utils.TypeCounter;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects.Vector3;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.interfaces.IRayTracer;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerSelectListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.WorldLoadListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.*;
import com.craftmend.openaudiomc.spigot.modules.speakers.tasks.SpeakerGarbageCollection;
import com.craftmend.openaudiomc.spigot.modules.speakers.tracing.EstimatedRayTracer;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerCreateListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerDestroyListener;

import lombok.Getter;
import org.bukkit.*;
import org.bukkit.block.Block;

import java.util.*;

public class SpeakerModule {

    @Getter private SpeakerLoader loader;
    @Getter private SpeakerCollector collector;

    public static final SpeakerType DEFAULT_SPEAKER_TYPE = SpeakerType.SPEAKER_2D;
    @Getter private Map<MappedLocation, Speaker> speakerMap = new HashMap<>();
    private Map<String, SpeakerMedia> speakerMediaMap = new HashMap<>();
    @Getter private Material playerSkullItem;
    @Getter private Material playerSkullBlock;
    @Getter private Map<String, Set<QueuedSpeaker>> waitingWorlds = new HashMap<>();
    @Getter private ServerVersion version;

    private EstimatedRayTracer estimatedRayTracer = new EstimatedRayTracer();

    public SpeakerModule(OpenAudioMcSpigot openAudioMcSpigot) {
        openAudioMcSpigot.registerEvents(
                new SpeakerSelectListener(this),
                new SpeakerCreateListener(openAudioMcSpigot, this),
                new SpeakerDestroyListener(OpenAudioMc.getInstance(), this),
                new WorldLoadListener()
        );

        collector = new SpeakerCollector(this);
        loader = new SpeakerLoader(this);

        initializeVersion();
        loader.loadFiles();

        // setup garbage system
        new SpeakerGarbageCollection(this);

        // reset with new addon
        OpenAudioMc.getInstance().getMediaModule().getResetTriggers().add(() -> {
            speakerMediaMap.clear();
        });
    }

    public IRayTracer getRayTracer() {
        // provide a default ray tracer, just use the simple one for now
        return estimatedRayTracer;
    }

    private void initializeVersion() {
        version = OpenAudioMcSpigot.getInstance().getServerService().getVersion();

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

    public void registerSpeaker(MappedLocation mappedLocation, String source, UUID uuid, int radius, SpeakerType type) {
        Speaker speaker = new Speaker(source, uuid, radius, mappedLocation, type);
        speakerMap.put(mappedLocation, speaker);
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
