package com.craftmend.openaudiomc.generic.migrations;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.migrations.migrations.*;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MigrationWorker {

    public void handleMigrations() {
        final SimpleMigration[] migrations = new SimpleMigration[] {
                new MouseHoverMessageMigration(),       // adds a config field for the hover-to-connect message
                new TipsSettingMigration(),             // adds a config field for the staff-tips option
                new UpdateSettingMigration(),           // adds config fields for update and announcement preferences,
                new LegalAcceptanceMigration(),         // binding statements about accepting our rules
                new SessionGenerationMigration(),       // messages for generation and session errors
                new AuthHostMigration(),                // host details as part of handshake hash
                new AddPreFetchMigration(),             // add a config value for how many files to prefetch
                new AddVolumeHintMigration(),           // add a config value for default volume messages
                new AddGcStratMigration(),              // add a config value for GC strats
                new AddNewVoicechatMessagesMigration(), // adds new chat messages for the voice chat system
                new AddVcAnnouncementMigration(),       // adds the config option to toggle chat announcements
                new VoiceConnectedMessageMigration(),   // adds required messages for mic mute commands
                new AddVcStabilityMessage(),            // Add messages that warn players of voicechat issues
                new AddVcRegionMigration(),             // Add messages for muted voicechat areas
                new AddMultiUserMigration(),            // adds messages for multi user vc shit
                new VoicechatHotkeyConfigMigration(),   // adds the config option to disable mute/unmute hokeys
                new VoicechatChatMessageLocation(),     // new setting for message location
        };

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
        OpenAudioLogger.toConsole("Skipped " + skipped + "/" + migrations.length + " migrations.");
    }

}
