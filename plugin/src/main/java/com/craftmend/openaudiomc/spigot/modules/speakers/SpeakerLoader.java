package com.craftmend.openaudiomc.spigot.modules.speakers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.QueuedSpeaker;
import lombok.AllArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.World;
import org.bukkit.block.Block;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
public class SpeakerLoader {

    private SpeakerService speakerService;

    public void loadFiles() {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();

        //load speakers
        for (String id : config.getStringSet("speakers", StorageLocation.DATA_FILE)) {
            // check if said world is loaded
            String world = config.getStringFromPath("speakers." + id + ".world", StorageLocation.DATA_FILE);
            World bukkitWorld = Bukkit.getWorld(world);
            if (bukkitWorld == null) {
                Set<QueuedSpeaker> queue = speakerService.getWaitingWorlds().getOrDefault(world, new HashSet<>());
                queue.add(new QueuedSpeaker(world, id));
                speakerService.getWaitingWorlds().put(world, queue);
            } else {
                loadFromFile(id);
            }
        }

    }

    public void loadFromFile(String id) {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();

        String world = config.getStringFromPath("speakers." + id + ".world", StorageLocation.DATA_FILE);
        String media = config.getStringFromPath("speakers." + id + ".media", StorageLocation.DATA_FILE);
        int x = config.getIntFromPath("speakers." + id + ".x", StorageLocation.DATA_FILE);
        int y = config.getIntFromPath("speakers." + id + ".y", StorageLocation.DATA_FILE);
        int z = config.getIntFromPath("speakers." + id + ".z", StorageLocation.DATA_FILE);
        int radius = config.getIntFromPath("speakers." + id + ".radius", StorageLocation.DATA_FILE);
        Set<String> options = config.getStringSet("speakers." + id + ".options", StorageLocation.DATA_FILE);
        Set<ExtraSpeakerOptions> extraOptions = new HashSet<>();

        // are are they enabled?
        for (String option : options) {
            if (config.getStringFromPath("speakers." + id + ".options." + option, StorageLocation.DATA_FILE) == "true") {
                extraOptions.add(ExtraSpeakerOptions.valueOf(option.toUpperCase()));
            }
        }

        // try to figure out what type the speaker is when loading
        // it might be none, since speakers were introduced before this update
        // but we'll just fallback to 2d when it comes to it
        SpeakerType speakerType;
        if (!config.getStringFromPath("speakers." + id + ".type", StorageLocation.DATA_FILE).startsWith("<")) {
            String typeName = config.getStringFromPath("speakers." + id + ".type", StorageLocation.DATA_FILE);
            speakerType = SpeakerType.valueOf(typeName);
        } else {
            // like i said, falling back on 2D, but might fallback to 3D later
            speakerType = SpeakerService.DEFAULT_SPEAKER_TYPE;
        }


        if (world != null) {
            MappedLocation mappedLocation = new MappedLocation(x, y, z, world);
            Block blockAt = mappedLocation.getBlock();

            if (blockAt != null) {
                speakerService.registerSpeaker(mappedLocation, media, UUID.fromString(id), radius, speakerType, extraOptions);
            } else {
                OpenAudioLogger.toConsole("Speaker " + id + " doesn't to seem be valid anymore, so it's not getting loaded.");
            }
        }
    }

}
