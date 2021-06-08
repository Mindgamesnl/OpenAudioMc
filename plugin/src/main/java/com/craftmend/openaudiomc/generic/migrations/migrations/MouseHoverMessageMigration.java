package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;

public class MouseHoverMessageMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        return !config.hasStorageKey(StorageKey.MESSAGE_HOVER_TO_CONNECT);
    }

    @Override
    public void execute() {
        migrateFilesFromResources();
    }
}
