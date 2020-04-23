package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;

import java.util.HashMap;
import java.util.Map;

public class PlusAccessLevelMigration implements SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        String value = OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.SETTINGS_PLUS_ACCESS_LEVEL);
        return (value == null || value.startsWith("<un"));
    }

    @Override
    public void execute() {
        // settings that should be moved over
        Map<StorageKey, Object> oldValues = new HashMap<>();
        for (StorageKey value : StorageKey.values()) {
            if (!value.isDeprecated()) {
                oldValues.put(value, OpenAudioMc.getInstance().getConfigurationImplementation().get(value));
            }
        }

        // force reload conf
        OpenAudioMc.getInstance().getConfigurationImplementation().saveAllhard();

        // force update values
        for (Map.Entry<StorageKey, Object> entry : oldValues.entrySet()) {
            StorageKey key = entry.getKey();
            Object value = entry.getValue();
            if (value == null) {
                OpenAudioLogger.toConsole("Skipping migration key " + key.name() + " because its null.");
            } else {
                OpenAudioLogger.toConsole("Migrating " + key.name() + " value " + value.toString());
            }
            OpenAudioMc.getInstance().getConfigurationImplementation().set(key, value);
        }

        // soft save to reflect the old values and write them to the new file
        OpenAudioMc.getInstance().getConfigurationImplementation().saveAll();
    }
}
