package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
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
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();

        // settings that should be moved over
        Map<StorageKey, Object> oldValues = new HashMap<>();
        for (StorageKey value : StorageKey.values()) {
            if (!value.isDeprecated()) {
                oldValues.put(value, config.get(value));
            }
        }

        // force reload conf
        config.saveAllhard();
        config.reloadConfig();

        // force update values
        for (Map.Entry<StorageKey, Object> entry : oldValues.entrySet()) {
            StorageKey key = entry.getKey();
            Object value = entry.getValue();
            if (value == null) {
                OpenAudioLogger.toConsole("Skipping migration key " + key.name() + " because its null.");
            } else {
                OpenAudioLogger.toConsole("Migrating " + key.name() + " value " + value.toString());
            }
            config.set(key, value);
        }

        // soft save to reflect the old values and write them to the new file
        config.saveAll();
    }
}
