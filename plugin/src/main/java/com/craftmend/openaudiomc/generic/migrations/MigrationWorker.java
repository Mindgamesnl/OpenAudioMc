package com.craftmend.openaudiomc.generic.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.backups.BackupService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.migrations.migrations.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

@NoArgsConstructor
public class MigrationWorker {

    @Getter private int migrationsFinished = 0;
    @Getter private int migrationsSkipped = 0;

    public void handleMigrations() {
        final SimpleMigration[] migrations = new SimpleMigration[] {
                new MouseHoverMessageMigration(),       // adds a config field for the hover-to-connect message
                new TipsSettingMigration(),             // adds a config field for the staff-tips option
                new UpdateSettingMigration(),           // adds config fields for update and announcement preferences,
                new LegalAcceptanceMigration(),         // binding statements about accepting our rules
                new SessionGenerationMigration(),       // messages for generation and session errors
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
                new AddVoiceTracingMigration(),         // add voicechat raytracing toggle
                new AddAutoClaimMigration(),            // add a config value to configure automatic claiming hooks
                new SpeakerDatabaseMigration(),         // Migrate speakers from data.yml to the database
                new RegionDatabaseMigration(),          // migrate speakers, just like regions
                new AliasDatabaseMigration(),           // migrate aliases
                new PredictiveCacheMigration(),         // migrate audio smart cache
                new AddRDTimeoutMigration(),            // configurable timeout
                new AddPapiMigration(),                 // add placeholder api values
                new AddRDIpMigration(),                 // add rd ip config
                new AddVcModConfigMigration(),          // adds the option to enable/disable moderation support
                new AddVcJoinLoadMigration(),           // adds the option to enable/disable vc join during load
                new AddSendOnJoinDelayMigration(),      // adds the option to delay the send on join message
                new AddOfflinemodeAndCdnMigration(),    // adds the option to enable/disable cdn and offlinemode
                new CommandSenderWorldMigration(),      // adds the default world name value
                new VoiceVicinityMessageMigration(),    // adds the voice vicinity messages and settings
                new SpeakerTickMigration(),             // adds the speaker tick rate setting
                new CdnCheckSkipMigration(),            // adds the option to skip cdn validation
                new ChangeDefaultMultilineMigration(),  // changes the default multiline message
                new TokenMessageMigration(),            // adds the token message
                new AddVehicleRegionConfigMigration(),  // adds the option to disable regions while in a vehicle
                new VoicechatDeafenMigration(),         // adds the option to deafen yourself
        };

        for (SimpleMigration migration : migrations) {
            if (migration.shouldBeRun(this)) {
                OpenAudioMc.getService(BackupService.class).makeBackup(false);
                OpenAudioLogger.toConsole("Migration Service: Running migration " + migration.getClass().getSimpleName());
                migration.execute(this);
                OpenAudioLogger.toConsole("Migration Service: Finished migrating " + migration.getClass().getSimpleName());
                migrationsFinished++;
            } else {
                migrationsSkipped++;
            }
        }
        OpenAudioLogger.toConsole("Skipped " + migrationsSkipped + "/" + migrations.length + " migrations.");
    }

}
