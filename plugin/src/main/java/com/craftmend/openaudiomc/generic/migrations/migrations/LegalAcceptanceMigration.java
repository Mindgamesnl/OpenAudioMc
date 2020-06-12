package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;

public class LegalAcceptanceMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();
        return !config.hasStorageKey(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY);
    }

    @Override
    public void execute() {
        migrateFilesFromResources();
    }
}
