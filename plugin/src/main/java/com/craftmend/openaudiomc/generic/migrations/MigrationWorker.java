package com.craftmend.openaudiomc.generic.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.migrations.migrations.LocalClientToPlusMigration;
import com.craftmend.openaudiomc.generic.migrations.migrations.PlusAccessLevelMigration;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MigrationWorker {

    private final SimpleMigration[] migrations = new SimpleMigration[] {
            new LocalClientToPlusMigration(),
            new PlusAccessLevelMigration()
    };

    public void handleMigrations(OpenAudioMc main) {
        for (SimpleMigration migration : migrations) {
            if (migration.shouldBeRun()) {
                OpenAudioLogger.toConsole("Migration Service: Running migration " + migration.getClass().getSimpleName());
                migration.execute();
                OpenAudioLogger.toConsole("Migration Service: Finished migrating " + migration.getClass().getSimpleName());
            }
        }
    }

}
