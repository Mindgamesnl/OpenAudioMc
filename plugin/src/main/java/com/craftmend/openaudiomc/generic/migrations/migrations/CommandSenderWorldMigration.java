package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import org.bukkit.Bukkit;
import org.bukkit.World;
import org.bukkit.WorldType;

public class CommandSenderWorldMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun(MigrationWorker migrationWorker) {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        return !config.hasStorageKey(StorageKey.SETTINGS_DEFAULT_WORLD_NAME);
    }

    @Override
    public void execute(MigrationWorker migrationWorker) {

        try {
            // check if Bukkit is available
            Class.forName("org.bukkit.Bukkit");
            // if it is, we can safely assume that the server is running bukkit
            for (World world : Bukkit.getWorlds()) {
                // get the first world that is not a nether or end world, this is a nice to have and not a requirement
                if (world.getName().contains("_nether") || world.getName().contains("_end")) continue;
                forceOverwrittenValues.put(StorageKey.SETTINGS_DEFAULT_WORLD_NAME.getSubSection(), world.getName());
                break;
            }
        } catch (ClassNotFoundException | NoClassDefFoundError | NullPointerException e ) {
            // ignored, we'll just use the default value
        }

        migrateFilesFromResources();
    }
}
