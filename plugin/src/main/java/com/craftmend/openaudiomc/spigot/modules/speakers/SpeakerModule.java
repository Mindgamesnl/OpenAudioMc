package com.craftmend.openaudiomc.spigot.modules.speakers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.utils.TypeCounter;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects.Vector3;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerSelectListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.WorldLoadListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.*;
import com.craftmend.openaudiomc.spigot.modules.speakers.tasks.SpeakerGarbageCollection;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerCreateListener;
import com.craftmend.openaudiomc.spigot.modules.speakers.listeners.SpeakerDestroyListener;

import lombok.Getter;
import org.bukkit.*;
import org.bukkit.block.Block;

import java.util.*;

public class SpeakerModule {

    public static final SpeakerType DEFAULT_SPEAKER_TYPE = SpeakerType.SPEAKER_2D;
    @Getter private Map<MappedLocation, Speaker> speakerMap = new HashMap<>();
    private Map<String, SpeakerMedia> speakerMediaMap = new HashMap<>();
    @Getter private Material playerSkullItem;
    @Getter private Material playerSkullBlock;
    @Getter private Map<String, Set<QueuedSpeaker>> waitingWorlds = new HashMap<>();
    @Getter private ServerVersion version;

    public SpeakerModule(OpenAudioMcSpigot openAudioMcSpigot) {
        openAudioMcSpigot.getServer().getPluginManager().registerEvents(new SpeakerSelectListener(this), openAudioMcSpigot);
        openAudioMcSpigot.getServer().getPluginManager().registerEvents(new SpeakerCreateListener(openAudioMcSpigot, this), openAudioMcSpigot);
        openAudioMcSpigot.getServer().getPluginManager().registerEvents(new SpeakerDestroyListener(OpenAudioMc.getInstance(), this), openAudioMcSpigot);
        openAudioMcSpigot.getServer().getPluginManager().registerEvents(new WorldLoadListener(), openAudioMcSpigot);

        version = openAudioMcSpigot.getServerService().getVersion();


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

        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();

        //load speakers
        for (String id : config.getStringSet("speakers", StorageLocation.DATA_FILE)) {
            // check if said world is loaded
            String world = config.getStringFromPath("speakers." + id + ".world", StorageLocation.DATA_FILE);
            World bukkitWorld = Bukkit.getWorld(world);
            if (bukkitWorld == null) {
                Set<QueuedSpeaker> queue = waitingWorlds.getOrDefault(world, new HashSet<>());
                queue.add(new QueuedSpeaker(world, id));
                waitingWorlds.put(world, queue);
            } else {
                loadFromFile(id);
            }
        }

        // setup garbage system
        new SpeakerGarbageCollection(this);
    }

    public Collection<ApplicableSpeaker> getApplicableSpeakers(Location location) {
        List<Speaker> applicableSpeakers = new ArrayList<>(speakerMap.values());
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

    public SpeakerType guessSpeakerType(Location location, String source) {
        Collection<ApplicableSpeaker> speakers = getApplicableSpeakers(location);
        speakers.removeIf(other -> !other.getSpeaker().getMedia().getSource().equals(source));
        TypeCounter<SpeakerType> typeCounter = new TypeCounter<>();

        for (ApplicableSpeaker speaker : speakers) {
            typeCounter.bumpCounter(speaker.getSpeakerType());
        }

        SpeakerType highest = typeCounter.getHighest();
        return highest == null ? DEFAULT_SPEAKER_TYPE : highest;
    }

    public void loadFromFile(String id) {
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();

        String world = config.getStringFromPath("speakers." + id + ".world", StorageLocation.DATA_FILE);
        String media = config.getStringFromPath("speakers." + id + ".media", StorageLocation.DATA_FILE);
        int x = config.getIntFromPath("speakers." + id + ".x", StorageLocation.DATA_FILE);
        int y = config.getIntFromPath("speakers." + id + ".y", StorageLocation.DATA_FILE);
        int z = config.getIntFromPath("speakers." + id + ".z", StorageLocation.DATA_FILE);
        int radius = config.getIntFromPath("speakers." + id + ".radius", StorageLocation.DATA_FILE);

        // try to figure out what type the speaker is when loading
        // it might be none, since speakers were introduced before this update
        // but we'll just fallback to 2d when it comes to it
        SpeakerType speakerType;
        if (!config.getStringFromPath("speakers." + id + ".type", StorageLocation.DATA_FILE).startsWith("<")) {
            String typeName = config.getStringFromPath("speakers." + id + ".type", StorageLocation.DATA_FILE);
            speakerType = SpeakerType.valueOf(typeName);
        } else {
            // like i said, falling back on 2D, but might fallback to 3D later
            speakerType = SpeakerModule.DEFAULT_SPEAKER_TYPE;
        }


        if (world != null) {
            MappedLocation mappedLocation = new MappedLocation(x, y, z, world);
            Block blockAt = mappedLocation.getBlock();

            if (blockAt != null) {
                registerSpeaker(mappedLocation, media, UUID.fromString(id), radius, speakerType);
            } else {
                OpenAudioLogger.toConsole("Speaker " + id + " doesn't to seem be valid anymore, so it's not getting loaded.");
            }
        }
    }

}
