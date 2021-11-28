package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.QueuedSpeaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import org.bukkit.Bukkit;
import org.bukkit.World;
import org.bukkit.block.Block;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class SpeakerDatabaseMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun(MigrationWorker migrationWorker) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) return false;

        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        return !config.getStringSet("speakers", StorageLocation.DATA_FILE).isEmpty();
    }

    @Override
    public void execute(MigrationWorker migrationWorker) {
        OpenAudioLogger.toConsole("Migrating speakers from the data.yml");
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        DatabaseService service = OpenAudioMc.getService(DatabaseService.class);

        for (String id : config.getStringSet("speakers", StorageLocation.DATA_FILE)) {
            // check if said world is loaded
            OpenAudioLogger.toConsole("Migrating speaker " + id);
            Speaker speaker = loadFromFile(id);
            service.getTable(Speaker.class)
                    .save(speaker.getId().toString(), speaker);
            config.setString(StorageLocation.DATA_FILE, "speakers." + id, null);
            config.saveAll();
        }
    }

    public Speaker loadFromFile(String id) {
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

        MappedLocation mappedLocation = new MappedLocation(x, y, z, world);
        Speaker speaker = new Speaker(media, UUID.fromString(id), radius, mappedLocation, speakerType, extraOptions);
        return speaker;
    }

}
