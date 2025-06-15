package com.craftmend.openaudiomc.generic.migrations.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.system.FileUtil;
import org.yaml.snakeyaml.Yaml;

import java.io.*;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public abstract class SimpleMigration {

    public abstract boolean shouldBeRun(MigrationWorker migrationWorker);

    public abstract void execute(MigrationWorker migrationWorker);

    protected static Map<String, Object> forceOverwrittenValues = new HashMap<>();
    protected Set<StorageKey> ignoredOldValues = new HashSet<>();

    protected void migrateFilesFromResources() {
        //loadDefaultValues();

        OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
        Configuration config = openAudioMc.getConfiguration();

        // settings that should be moved over
        Map<StorageKey, Object> oldValues = new HashMap<>();
        for (StorageKey value : StorageKey.values()) {
            if (forceOverwrittenValues.containsKey(value.getSubSection())) {
                oldValues.put(value, forceOverwrittenValues.get(value.getSubSection()));
            } else {
                if (!value.isDeprecated()) {
                    if (config.hasStorageKey(value))  {
                        Object previousValue = config.get(value);
                        oldValues.put(value, previousValue);
                    }
                }
            }
        }

        // overwrite files
        config.overwriteConfigFile();

        // re-initialize entire module
        config.reloadConfig();
        config = openAudioMc.getConfiguration();

        // force update values
        for (Map.Entry<StorageKey, Object> entry : oldValues.entrySet()) {
            StorageKey key = entry.getKey();
            Object value = entry.getValue();

            if (ignoredOldValues.contains(key)) {
                continue;
            }

            if (forceOverwrittenValues.containsKey(key.getSubSection())) {
                value = forceOverwrittenValues.get(key.getSubSection());
            }

            if (oldValues.containsKey(key)) {
                OpenAudioLogger.info("Migrating " + key.getSubSection() + " from " + value + " to the new file");
                value = oldValues.get(key);
            }

            if (value != null) {
                config.set(key, value);
            }
        }

        // soft save to reflect the old values and write them to the new file
        config.saveAll(true);
        // force oa to reload
        OpenAudioMc.getInstance().getInvoker().getConfigurationProvider().reloadConfig();
    }

    private String escapeValues(String input, Object original) {
        char[] characters = input.toCharArray();
        StringBuilder escaped = new StringBuilder();
        boolean shouldEnclose = original instanceof String;

        if (shouldEnclose) escaped.append("'");

        for (char character : characters) {
            // extra escape rules
            if (character == '\'') escaped.append(character);

            escaped.append(character);
        }

        if (shouldEnclose) escaped.append("'");

        return escaped.toString();
    }

}
