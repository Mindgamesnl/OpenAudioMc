package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;

public class AddVcStabilityMessage extends SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
        return !config.hasStorageKey(StorageKey.MESSAGE_VC_RECOVERED);
    }

    @Override
    public void execute() {
        migrateFilesFromResources();
    }
}
