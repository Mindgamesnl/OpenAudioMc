package com.craftmend.openaudiomc.generic.migrations.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

public abstract class SimpleMigration {

    public abstract boolean shouldBeRun();

    public abstract void execute();

    protected void migrateFilesFromResources() {
        OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
        ConfigurationImplementation config = openAudioMc.getConfiguration();

        // settings that should be moved over
        Map<StorageKey, Object> oldValues = new HashMap<>();
        for (StorageKey value : StorageKey.values()) {
            if (!value.isDeprecated() && config.hasStorageKey(value)) oldValues.put(value, config.get(value));
        }

        // overwrite files
        config.overwriteConfigFile();

        // re-initialize entire module
        config.reloadConfig();

        config = openAudioMc.getConfiguration();

        // file handling is super SUPER weird, we need to manually update some fields
        File mainConfig = new File("plugins/OpenAudioMc/config.yml");
        StringBuilder oldContent = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(mainConfig))) {
            String line = reader.readLine();

            while (line != null) {
                // if the line contains a key, do magic
                for (Map.Entry<StorageKey, Object> entry : oldValues.entrySet()) {
                    StorageKey key = entry.getKey();
                    Object value = entry.getValue();
                    if (value != null) {
                        String subSection = key.getSubSection();
                        if (line.contains(" " + subSection + ": ")) {
                            String[] lineElements = line.split(subSection);

                            // actual line
                            if (value instanceof String) {
                                line = lineElements[0] + subSection + ": " + escapeValues(value.toString(), value);
                            } else {
                                line = lineElements[0] + subSection + ": " + value.toString();
                            }
                        }
                    }
                }

                oldContent.append(line).append(System.lineSeparator());
                line = reader.readLine();
            }

            try (FileWriter writer = new FileWriter(mainConfig)) {
                writer.write(oldContent.toString());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // force update values
        for (Map.Entry<StorageKey, Object> entry : oldValues.entrySet()) {
            StorageKey key = entry.getKey();
            Object value = entry.getValue();
            if (value == null) {
                OpenAudioLogger.toConsole("Skipping migration key " + key.name() + " because its null.");
            } else {
                OpenAudioLogger.toConsole("Migrating " + key.name() + " value " + value.toString() + " as part of " + getClass().getSimpleName());
                config.set(key, value);
            }
        }

        // soft save to reflect the old values and write them to the new file
        config.saveAll();
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
