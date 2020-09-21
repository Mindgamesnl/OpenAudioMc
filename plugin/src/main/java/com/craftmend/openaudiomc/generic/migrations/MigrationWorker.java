package com.craftmend.openaudiomc.generic.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.migrations.migrations.*;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MigrationWorker {

    private final SimpleMigration[] migrations = new SimpleMigration[] {
            new LocalClientToPlusMigration(),       // migrates old users to 6.2 and uploads old data to oa+, then resets config
            new PlusAccessLevelMigration(),         // adds config values for the permissions patch
            new MouseHoverMessageMigration(),       // adds a config field for the hover-to-connect message
            new TipsSettingMigration(),             // adds a config field for the staff-tips option
            new UpdateSettingMigration(),           // adds config fields for update and announcement preferences,
            new LegalAcceptanceMigration(),         // binding statements about accepting our rules
            new RemoveLoopTempRegionMigration(),    // re branding temp regions to shows
            new SessionGenerationMigration(),       // messages for generation and session errors
            new AuthHostMigration(),                // host details as part of handshake hash
            new AddPreFetchMigration(),             // add config value for how many files to prefetch
    };

    public void handleMigrations(OpenAudioMc main) {
        int skipped = 0;
        for (SimpleMigration migration : migrations) {
            if (migration.shouldBeRun()) {
                OpenAudioLogger.toConsole("Migration Service: Running migration " + migration.getClass().getSimpleName());
                migration.execute();
                OpenAudioLogger.toConsole("Migration Service: Finished migrating " + migration.getClass().getSimpleName());
            } else {
                skipped++;
            }
        }
        OpenAudioLogger.toConsole("Skipped " + skipped + " migrations.");
    }

}
