package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;

public class PlusAccessLevelMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        return config.hasStorageKey(StorageKey.SETTINGS_CLIENT_START_SOUND);
    }

    @Override
    public void execute() {
        migrateFilesFromResources();
    }
}
