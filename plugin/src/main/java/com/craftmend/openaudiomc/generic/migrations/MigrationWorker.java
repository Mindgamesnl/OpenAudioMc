package com.craftmend.openaudiomc.generic.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.backups.BackupService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.migrations.migrations.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.craftmend.openaudiomc.generic.storage.enums.StorageKey.*;

@NoArgsConstructor
public class MigrationWorker {

    @Getter
    private int migrationsFinished = 0;
    @Getter
    private int migrationsSkipped = 0;

    public void handleMigrations() {
        final SimpleMigration[] migrations = new SimpleMigration[]{
                new AddConfigKeyMigration(MESSAGE_HOVER_TO_CONNECT, "adds a config field for the hover-to-connect message"),
                new AddConfigKeyMigration(SETTINGS_STAFF_TIPS, "adds a config field for the staff-tips option"),
                new AddConfigKeyMigration(SETTINGS_NOTIFY_UPDATES, "adds config fields for update and announcement preferences,"),
                new AddConfigKeyMigration(MESSAGE_GENERATING_SESSION, "messages for generation and session errors"),
                new AddConfigKeyMigration(SETTINGS_PRELOAD_SOUNDS, "add a config value for how many files to prefetch"),
                new AddConfigKeyMigration(MESSAGE_CLIENT_VOLUME, "add a config value for default volume messages"),
                new AddConfigKeyMigration(SETTINGS_GC_STRATEGY, "add a config value for GC strats"),
                new AddConfigKeyMigration(MESSAGE_VC_SETUP, "adds new chat messages for the voice chat system"),
                new AddConfigKeyMigration(SETTINGS_VC_ANNOUNCEMENTS, "adds the config option to toggle chat announcements"),
                new AddConfigKeyMigration(MESSAGE_VC_NOT_CONNECTED, "adds required messages for mic mute commands"),
                new AddConfigKeyMigration(MESSAGE_VC_RECOVERED, "Add messages that warn players of voicechat issues"),
                new AddConfigKeyMigration(SETTING_VC_LEFT_MUTED_REGION, "Add messages for muted voicechat areas"),
                new AddConfigKeyMigration(MESSAGE_VC_USERS_LEFT, "Add messages for when multiple peers drop"),
                new AddConfigKeyMigration(SETTINGS_VC_TOGGLE_MIC_SWAP, "adds the config option to disable mute/unmute hokeys"),
                new AddConfigKeyMigration(SETTINGS_VC_USE_HOTBAR, "new setting for message location"),
                new AddAutoClaimMigration(),            // add a config value to configure automatic claiming hooks
                new SpeakerDatabaseMigration(),         // Migrate speakers from data.yml to the database
                new RegionDatabaseMigration(),          // migrate speakers, just like regions
                new AliasDatabaseMigration(),           // migrate aliases
                new PredictiveCacheMigration(),         // migrate audio smart cache
                new AddConfigKeyMigration(CDN_TIMEOUT, "Add cdn timeout"),
                new AddConfigKeyMigration(SETTINGS_PAPI_CLIENT_CONNECTED, "Add papi messages"),
                new AddConfigKeyMigration(CDN_IP_OVERWRITE, "Add rd ip overwrite"),
                new AddConfigKeyMigration(SETTINGS_VC_MOD_ENABLED, "adds the option to enable/disable moderation support"),
                new AddConfigKeyMigration(SETTINGS_VC_ALLOW_JOIN_DURING_LOAD, "adds the option to enable/disable vc join during load"),
                new AddConfigKeyMigration(SETTINGS_SEND_URL_ON_JOIN_DELAY, "adds the option to delay the send on join message"),
                new AddConfigKeyMigration(CDN_ENABLED, "adds the option to enable/disable cdn and offlinemode"),
                new CommandSenderWorldMigration(),      // adds the default world name value
                new AddConfigKeyMigration(MESSAGE_VOICE_IN_VICINITY, "adds the voice vicinity messages and settings"),
                new AddConfigKeyMigration(SETTINGS_SPEAKER_REDSTONE_TICK_ENABLED, "adds the speaker tick rate setting"),
                new AddConfigKeyMigration(CDN_SKIP_VALIDATION, "adds the option to skip cdn validation"),
                new ChangeDefaultMultilineMigration(),  // changes the default multiline message
                new AddConfigKeyMigration(MESSAGE_TOKEN_ACTIVATION_SUCCESS, "adds the token message"),
                new AddConfigKeyMigration(SETTINGS_IGNORE_REGIONS_WHILE_IN_VEHICLE, "adds the option to disable regions while in a vehicle"),
                new AddConfigKeyMigration(MESSAGE_VC_DEAFEN, "adds the option to deafen yourself"),
                new AddConfigKeyMigration(REDIS_SENTINEL_MASTER_SET, "adds the option to use redis sentinel"),
                new AddConfigKeyMigration(SETTINGS_VOICE_FILTERS_GAMEMODE, "Add migrations for the new voicechat filters"),
                new AddConfigKeyMigration(MESSAGE_VOICE_COMMAND_ERROR_FORMAT, "Add migrations for the new voicechat channels"),
                new AddConfigKeyMigration(SETTINGS_CHANNEL_COMMAND_ENABLED, "Add migrations for the new static channels"),
                new AddConfigKeyMigration(SETTINGS_VOICE_FILTERS_CHANNEL, "Add migrations for the new voicechat channel filter"),
                new AddConfigKeyMigration(SETTINGS_PRELOAD_REPLENISH_POOL, "Add config value for better pool management"),
                new AddConfigKeyMigration(SETTINGS_AUTO_RECONNECT, "Add a migration setting for auto reconnect"),
                new AddConfigKeyMigration(SETTINGS_SPEAKER_MAX_RANGE, "Add max range config value"),
                new AddConfigKeyMigration(SETTINGS_STATIC_CHANNELS_SHOW_IN_WEB_UI, "Add a setting to show the channels web UI"),
        };

        for (SimpleMigration migration : migrations) {
            if (migration.shouldBeRun(this)) {
                OpenAudioMc.getService(BackupService.class).makeBackup(false);
                OpenAudioLogger.info("Migration Service: Running migration " + migration.getClass().getSimpleName());
                try {
                    migration.execute(this);
                } catch (Exception e) {
                    OpenAudioLogger.error(e, "Migration Service: Failed to run migration " + migration.getClass().getSimpleName());
                }
                OpenAudioLogger.info("Migration Service: Finished migrating " + migration.getClass().getSimpleName());
                migrationsFinished++;
            } else {
                migrationsSkipped++;
            }
        }
        OpenAudioLogger.info("Skipped " + migrationsSkipped + "/" + migrations.length + " migrations.");
    }

}
