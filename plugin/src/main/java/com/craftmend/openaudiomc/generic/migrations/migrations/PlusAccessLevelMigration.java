package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;

import java.util.HashMap;
import java.util.Map;

public class PlusAccessLevelMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();
        return config.hasStorageKey(StorageKey.SETTINGS_CLIENT_START_SOUND);
    }

    @Override
    public void execute() {
        migrateFilesFromResources();
    }
}
