package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;

public class AddConfigKeyMigration extends SimpleMigration {

    private final StorageKey key;
    private final String name;

    public AddConfigKeyMigration(StorageKey key, String name) {
        this.key = key;
        this.name = name;
    }

    @Override
    public boolean shouldBeRun(MigrationWorker migrationWorker) {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        return !config.hasStorageKey(key);
    }

    @Override
    public void execute(MigrationWorker migrationWorker) {
        OpenAudioLogger.info("Migrating config key for: " + name);
        migrateFilesFromResources();
    }
}
