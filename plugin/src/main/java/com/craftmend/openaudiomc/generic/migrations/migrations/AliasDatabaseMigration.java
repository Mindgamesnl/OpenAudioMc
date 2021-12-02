package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias;

public class AliasDatabaseMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun(MigrationWorker migrationWorker) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) return false;

        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        return !config.getStringSet("aliases", StorageLocation.DATA_FILE).isEmpty();
    }

    @Override
    public void execute(MigrationWorker migrationWorker) {
        OpenAudioLogger.toConsole("Migrating aliases from the data.yml");
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        DatabaseService service = OpenAudioMc.getService(DatabaseService.class);

        for (String id : config.getStringSet("aliases", StorageLocation.DATA_FILE)) {
            OpenAudioLogger.toConsole("Migrating alias " + id);
            service.getRepository(Alias.class)
                    .save(id, new Alias(id, config.getStringFromPath("aliases." + id, StorageLocation.DATA_FILE)));
            config.setString(StorageLocation.DATA_FILE, "aliases." + id, null);
        }
    }
}
