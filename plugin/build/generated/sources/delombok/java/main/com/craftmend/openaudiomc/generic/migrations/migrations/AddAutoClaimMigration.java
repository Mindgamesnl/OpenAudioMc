package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;

public class AddAutoClaimMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun(MigrationWorker migrationWorker) {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        return !config.hasStorageKey(StorageKey.SETTINGS_VC_AUTOCLAIM) || migrationWorker.getMigrationsFinished() != 0;
    }

    @Override
    public void execute(MigrationWorker migrationWorker) {
        forceOverwrittenValues.put(StorageKey.SETTINGS_VC_AUTOCLAIM.getSubSection(), false);
        migrateFilesFromResources();
        // we've been running migrations, so we need to set it to false as to not break anything
        OpenAudioLogger.info("Overwriting default for " + getClass().getSimpleName() + " to maintain compatibility");
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        forceOverwrittenValues.put(StorageKey.SETTINGS_VC_AUTOCLAIM.getSubSection(), false);
        config.setBoolean(StorageKey.SETTINGS_VC_AUTOCLAIM, false);
    }
}
