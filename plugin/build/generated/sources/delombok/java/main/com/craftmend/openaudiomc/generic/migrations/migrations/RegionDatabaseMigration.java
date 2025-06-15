package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;

public class RegionDatabaseMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun(MigrationWorker migrationWorker) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) return false;

        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        return !config.getStringSet("regions", StorageLocation.DATA_FILE).isEmpty();
    }

    @Override
    public void execute(MigrationWorker migrationWorker) {
        OpenAudioLogger.info("Migrating regions from the data.yml");
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        DatabaseService service = OpenAudioMc.getService(DatabaseService.class);

        for (String id : config.getStringSet("regions", StorageLocation.DATA_FILE)) {
            OpenAudioLogger.info("Migrating region " + id + " to the the new storage format");

            String source = config.getStringFromPath("regions." + id, StorageLocation.DATA_FILE);

            int volume = config.getIntFromPath("regionsvolume." + id, StorageLocation.DATA_FILE);
            if (volume < 5) {
                volume = 100;
            }

            int fadeTimeMs = config.getIntFromPath("regionsfadetime." + id, StorageLocation.DATA_FILE);
            if (fadeTimeMs == 0) {
                fadeTimeMs = 1000;
            }

            // is voicechat enabled? but we'll need to check if the region even has this data, since it might be considered legacy
            boolean isVcEnabled = true;

            // only check paths on modern servers, 1.8 doesn't support contains lookups
            if (OpenAudioMc.getService(ServerService.class).getVersion() == ServerVersion.MODERN) {
                if (config.isPathValid("regionmeta." + id + "allow-vc", StorageLocation.DATA_FILE)) {
                    isVcEnabled = Boolean.valueOf(config.getStringFromPath("regionmeta." + id + "allow-vc", StorageLocation.DATA_FILE));
                }
            }

            RegionProperties properties = new RegionProperties(source, volume, fadeTimeMs, isVcEnabled, id);
            service.getRepository(RegionProperties.class)
                    .save(properties);

            config.setString(StorageLocation.DATA_FILE, "regions." + id, null);
            config.setString(StorageLocation.DATA_FILE, "regionmeta." + id, null);
            config.setString(StorageLocation.DATA_FILE, "regionsfadetime." + id, null);
            config.setString(StorageLocation.DATA_FILE, "regionsvolume." + id, null);
        }
    }
}
