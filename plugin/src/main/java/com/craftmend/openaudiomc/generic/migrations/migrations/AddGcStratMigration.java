package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;

public class AddGcStratMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
        return !config.hasStorageKey(StorageKey.SETTINGS_GC_STRATIGY);
    }

    @Override
    public void execute() {
        migrateFilesFromResources();
    }
}
