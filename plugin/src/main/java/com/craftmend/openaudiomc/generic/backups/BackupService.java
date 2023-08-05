package com.craftmend.openaudiomc.generic.backups;

import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class BackupService extends Service {

    private boolean madeBackup = false;

    public void makeBackup(boolean force) {
        if (!force) {
            if (madeBackup) return;
            madeBackup = true;
        }
        OpenAudioLogger.toConsole("Making a backup of your database, config, and data.yml");

        // check backups dir
        File backupRootDirectory = new File(MagicValue.STORAGE_DIRECTORY.get(File.class), File.pathSeparator + "backups");
        if (!backupRootDirectory.exists()) {
            backupRootDirectory.mkdir();
        }

        long unixTime = System.currentTimeMillis() / 1000L;
        // create current backup dir
        File backupDir = new File(backupRootDirectory, "/backup-" + unixTime);
        if (!backupDir.exists()) {
            backupDir.mkdir();
        }

        try {
            Files.copy(
                    new File(MagicValue.STORAGE_DIRECTORY.get(File.class), "config.yml").toPath(),
                    new File(backupDir, "config.yml").toPath(),
                    StandardCopyOption.REPLACE_EXISTING
            );
        } catch (IOException e) {}

        try {
            Files.copy(
                    new File(MagicValue.STORAGE_DIRECTORY.get(File.class), "data.yml").toPath(),
                    new File(backupDir, "data.yml").toPath(),
                    StandardCopyOption.REPLACE_EXISTING
            );
        } catch (IOException e) {}

        try {
            Files.copy(
                    new File(MagicValue.STORAGE_DIRECTORY.get(File.class), "database.db").toPath(),
                    new File(backupDir, "database.db").toPath(),
                    StandardCopyOption.REPLACE_EXISTING
            );
        } catch (IOException e) {}

    }

}
