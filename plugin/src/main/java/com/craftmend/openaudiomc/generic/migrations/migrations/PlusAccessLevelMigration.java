package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.interfaces.OAConfiguration;
import com.craftmend.openaudiomc.generic.loggin.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.migrations.wrapper.UploadSettingsWrapper;
import com.craftmend.openaudiomc.generic.plus.response.ClientSettingsResponse;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.objects.ClientSettings;

import java.util.HashMap;
import java.util.Map;

public class PlusAccessLevelMigration implements SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        String value = OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.SETTINGS_PLUS_ACCESS_LEVEL);
        return (value == null || value.startsWith("<un"));
    }

    @Override
    public void execute() {
        // settings that should be moved over
        Map<StorageKey, Object> oldValues = new HashMap<>();
        for (StorageKey value : StorageKey.values()) {
            if (!value.isDeprecated()) {
                oldValues.put(value, OpenAudioMc.getInstance().getOAConfiguration().get(value));
            }
        }

        // force reload conf
        OpenAudioMc.getInstance().getOAConfiguration().saveAllhard();

        // force update values
        for (Map.Entry<StorageKey, Object> entry : oldValues.entrySet()) {
            StorageKey key = entry.getKey();
            Object value = entry.getValue();
            if (value == null) {
                OpenAudioLogger.toConsole("Skipping migration key " + key.name() + " because its null.");
            } else {
                OpenAudioLogger.toConsole("Migrating " + key.name() + " value " + value.toString());
            }
            OpenAudioMc.getInstance().getOAConfiguration().set(key, value);
        }

        // soft save to reflect the old values and write them to the new file
        OpenAudioMc.getInstance().getOAConfiguration().saveAll();
    }
}
