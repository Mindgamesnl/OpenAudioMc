package com.craftmend.openaudiomc.generic.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.migrations.migrations.LocalClientToPlusMigration;
import com.craftmend.openaudiomc.generic.migrations.migrations.MouseHoverMessageMigration;
import com.craftmend.openaudiomc.generic.migrations.migrations.PlusAccessLevelMigration;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MigrationWorker {

    private final SimpleMigration[] migrations = new SimpleMigration[] {
            new LocalClientToPlusMigration(), // migrates old users to 6.2 and uploads old data to oa+, then resets config
            new PlusAccessLevelMigration(),   // adds config values for the permissions patch
            new MouseHoverMessageMigration()  // adds a config field for the hover-to-connect message
    };

    public void handleMigrations(OpenAudioMc main) {
        for (SimpleMigration migration : migrations) {
            if (migration.shouldBeRun()) {
                OpenAudioLogger.toConsole("Migration Service: Running migration " + migration.getClass().getSimpleName());
                migration.execute();
                OpenAudioLogger.toConsole("Migration Service: Finished migrating " + migration.getClass().getSimpleName());
            } else {
                OpenAudioLogger.toConsole("Skipping migration " + migration.getClass().getSimpleName());
            }
        }
    }

}
