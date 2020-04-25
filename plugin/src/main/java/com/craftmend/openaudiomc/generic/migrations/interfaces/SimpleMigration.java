package com.craftmend.openaudiomc.generic.migrations.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;

import java.util.HashMap;
import java.util.Map;

public abstract class SimpleMigration {

    public abstract boolean shouldBeRun();
    public abstract void execute();

    protected void migrateFilesFromResources() {
        OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
        ConfigurationImplementation config = openAudioMc.getConfigurationImplementation();

        // settings that should be moved over
        Map<StorageKey, Object> oldValues = new HashMap<>();
        for (StorageKey value : StorageKey.values()) {
            if (!value.isDeprecated()) {
                oldValues.put(value, config.get(value));
            }
        }

        // overwrite files
        config.saveAllhard();

        // re-initialize entire module
        config.reloadConfig();

        openAudioMc.setConfigurationImplementation(openAudioMc.getInvoker().getConfigurationProvider());
        config = openAudioMc.getConfigurationImplementation();

        // force update values
        for (Map.Entry<StorageKey, Object> entry : oldValues.entrySet()) {
            StorageKey key = entry.getKey();
            Object value = entry.getValue();
            if (value == null) {
                OpenAudioLogger.toConsole("Skipping migration key " + key.name() + " because its null.");
            } else {
                OpenAudioLogger.toConsole("Migrating " + key.name() + " value " + value.toString() + " as part of " + getClass().getSimpleName());
            }
            config.set(key, value);
        }

        // soft save to reflect the old values and write them to the new file
        config.saveAll();
    }

}
