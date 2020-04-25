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
        String value = OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.SETTINGS_PLUS_ACCESS_LEVEL);
        return (value == null || value.startsWith("<un"));
    }

    @Override
    public void execute() {
        migrateFilesFromResources();
    }
}
