package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;

public class RemoveLoopTempRegionMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
        return config.hasStorageKey(StorageKey.SETTINGS_LOOP_TEMP_REGIONS);
    }

    @Override
    public void execute() {
        migrateFilesFromResources();
    }
}
