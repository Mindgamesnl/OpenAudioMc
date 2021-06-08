package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;

public class AddVcRegionMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        return !config.hasStorageKey(StorageKey.SETTING_VC_LEFT_MUTED_REGION);
    }

    @Override
    public void execute() {
        migrateFilesFromResources();
    }
}
