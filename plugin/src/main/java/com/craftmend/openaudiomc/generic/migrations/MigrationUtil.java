package com.craftmend.openaudiomc.generic.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;

public class MigrationUtil {

    public static void handleMigrations(OpenAudioMc main) {

        // old client
        if (main.getOAConfiguration().getString(StorageKey.AUTH_PUBLIC_URL).contains("app.openaudiomc")) {
            main.getOAConfiguration().setString(StorageKey.AUTH_PUBLIC_URL, "https://client.openaudiomc.net/?&data=");
            // hard update! I'm sorry...
            main.getOAConfiguration().saveAllhard();
        }

    }

}
