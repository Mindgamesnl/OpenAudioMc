package com.craftmend.openaudiomc.generic.storage.enums;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Getter;

import java.util.List;
import java.util.Map;

public enum StorageKey {

    MESSAGE_GENERATING_SESSION(false, "messages.preparing-session", StorageLocation.CONFIG_FILE),
    MESSAGE_SESSION_ERROR(false, "messages.session-error", StorageLocation.CONFIG_FILE),
    MESSAGE_PROMPT_TO_CONNECT(false, "messages.suggest-connection", StorageLocation.CONFIG_FILE),
    MESSAGE_CLICK_TO_CONNECT(false, "messages.click-to-connect", StorageLocation.CONFIG_FILE),
    MESSAGE_CONNECT_PROMPT_BEDROCK(false, "messages.connect-prompt-bedrock", StorageLocation.CONFIG_FILE),
    MESSAGE_HOVER_TO_CONNECT(false, "messages.click-to-connect-hover", StorageLocation.CONFIG_FILE),
    MESSAGE_LINK_EXPIRED(false, "messages.click-link-expired", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_CLOSED(false, "messages.client-closed", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_OPENED(false, "messages.client-opened", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_VOLUME_CHANGED(false, "messages.client-volume-change", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_VOLUME(false, "messages.client-volume", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_VOLUME_INVALID(false, "messages.client-volume-invalid", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_NOT_CONNECTED(false, "messages.client-not-connected", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_ALREADY_CONNECTED(false, "messages.client-already-connected", StorageLocation.CONFIG_FILE),

    MESSAGE_VC_SETUP(false, "messages.voicechat-enabled", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_USER_ADDED(false, "messages.voicechat-added-user", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_USERS_ADDED(false, "messages.voicechat-added-users", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_USER_LEFT(false, "messages.voicechat-removed-user", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_USERS_LEFT(false, "messages.voicechat-removed-users", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_MIC_MUTE(false, "messages.voicechat-mic-mute", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_MIC_UNMUTE(false, "messages.voicechat-mic-unmute", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_DEAFEN(false, "messages.voicechat-deafen", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_UNDEAFEN(false, "messages.voicechat-undeafen", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_NOT_CONNECTED(false, "messages.voice-not-connected", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_UNSTABLE(false, "messages.voicechat-service-unstable", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_RECOVERED(false, "messages.voicechat-service-recovered", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_IN_VICINITY(false, "messages.voicechat-players-in-vicinity", StorageLocation.CONFIG_FILE),

    MESSAGE_VOICE_CHANNEL_ABANDONED(false, "messages.voicechat-channel-abandoned", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_KICKED(false, "messages.voicechat-channel-kicked", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_INVITED(false, "messages.voicechat-channel-invited", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_NOT_A_PLAYER(false, "messages.voicechat-channel-not-a-player", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_NO_NAME(false, "messages.voicechat-channel-name-unknown", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_NAME_TAKEN(false, "messages.voicechat-channel-name-already-exists", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_CREATED(false, "messages.voicechat-channel-created", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_ALREADY_MEMBER(false, "messages.voicechat-channel-already-in", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_NOT_FOUND(false, "messages.voicechat-channel-name-not-found", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_JOINED(false, "messages.voicechat-channel-joined", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_INVITE_ONLY(false, "messages.voicechat-channel-invite-only", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_NO_PERMISSION_TO_JOIN(false, "messages.voicechat-channel-no-permission-to-join", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_TYPE_USER(false, "messages.voicechat-channel-type-user", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_TYPE_STATIC(false, "messages.voicechat-channel-type-static", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_TYPE_STATIC_LOCKED(false, "messages.voicechat-channel-type-static-permission", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_NOT_A_MEMBER(false, "messages.voicechat-channel-not-a-member", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_NOT_THE_OWNER(false, "messages.voicechat-channel-not-owner", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_MEMBER_NOT_FOUND(false, "messages.voicechat-channel-player-not-found", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_TARGET_ALREADY_MEMBER(false, "messages.voicechat-channel-player-already-in-channel", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_TARGET_NOT_CONNECTED(false, "messages.voicechat-target-not-connected", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_INVITATION_SENT(false, "messages.voicechat-target-invitation-sent", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_INVITATION_EXPIRED(false, "messages.voicechat-target-invitation-expired", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_LEFT(false, "messages.voicechat-channel-left", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_LIST_NO_CHANNELS(false, "messages.voicechat-channel-list-no-channels", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_LIST_HEADER(false, "messages.voicechat-channel-list-header", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_CHANNEL_LIST_ITEM(false, "messages.voicechat-channel-list-item", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_COMMAND_HELP_HEADER(false, "messages.voicechat-command-help-header", StorageLocation.CONFIG_FILE),
    MESSAGE_VOICE_COMMAND_ERROR_FORMAT(false, "messages.voicechat-command-error-format", StorageLocation.CONFIG_FILE),

    MESSAGE_TOKEN_ACTIVATION_LOADING(false, "messages.token-activation-loading", StorageLocation.CONFIG_FILE),
    MESSAGE_TOKEN_ACTIVATION_SUCCESS(false, "messages.token-activation-success", StorageLocation.CONFIG_FILE),
    MESSAGE_TOKEN_ACTIVATION_FAILED(false, "messages.token-activation-failed", StorageLocation.CONFIG_FILE),

    SETTING_VC_ENTERED_MUTED_REGION(false, "messages.voice-disabled-here", StorageLocation.CONFIG_FILE),
    SETTING_VC_LEFT_MUTED_REGION(false, "messages.voice-reenabled-here", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_ANNOUNCEMENTS(false, "options.voicechat-announcements", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_PROCESS_OBSTRUCTIONS(false, "options.voicechat-obstructions", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_ALLOW_JOIN_DURING_LOAD(false, "options.voicechat-allow-joining-while-loading", StorageLocation.CONFIG_FILE),
    SETTINGS_FORCE_OFFLINE_MODE(false, "options.force-offline-mode", StorageLocation.CONFIG_FILE),
    SETTINGS_DEFAULT_WORLD_NAME(false, "options.fallback-world-name", StorageLocation.CONFIG_FILE),

    SETTINGS_VOICECHAT_VICINITY_REMINDER_ENABLED(false, "options.voicechat-hint-enabled", StorageLocation.CONFIG_FILE),
    SETTINGS_VOICECHAT_VICINITY_REMINDER_INTERVAL(false, "options.voicechat-hint-interval", StorageLocation.CONFIG_FILE),
    SETTINGS_VOICECHAT_VICINITY_REMINDER_RADIUS(false, "options.voicechat-hint-range", StorageLocation.CONFIG_FILE),

    SETTINGS_REMIND_TO_CONNECT(false, "options.remind-to-connect", StorageLocation.CONFIG_FILE),
    SETTINGS_REMIND_TO_CONNECT_INTERVAL(false, "options.remind-to-connect-interval", StorageLocation.CONFIG_FILE),
    SETTINGS_REGIONS_SYNC(false, "options.sync-regions", StorageLocation.CONFIG_FILE),
    SETTINGS_SPEAKER_SYNC(false, "options.sync-speakers", StorageLocation.CONFIG_FILE),
    SETTINGS_SPEAKER_RANGE(false, "options.speaker-radius", StorageLocation.CONFIG_FILE),
    SETTINGS_SPEAKER_MAX_RANGE(false, "options.max-speaker-radius", StorageLocation.CONFIG_FILE),
    SETTINGS_SEND_URL_ON_JOIN(false, "options.send-on-join", StorageLocation.CONFIG_FILE),
    SETTINGS_SEND_URL_ON_JOIN_DELAY(false, "options.send-on-join-delay", StorageLocation.CONFIG_FILE),
    SETTINGS_USE_WG_PRIORITY(false, "options.use-region-priority", StorageLocation.CONFIG_FILE),
    SETTINGS_PLUS_ACCESS_LEVEL(false, "options.plus-access-level", StorageLocation.CONFIG_FILE),
    SETTINGS_STAFF_TIPS(false, "options.staff-tips", StorageLocation.CONFIG_FILE),
    SETTINGS_NOTIFY_UPDATES(false, "options.notify-updates", StorageLocation.CONFIG_FILE),
    SETTINGS_NOTIFY_ANNOUNCEMENTS(false, "options.notify-announcements", StorageLocation.CONFIG_FILE),
    SETTINGS_PRELOAD_SOUNDS(false, "options.preload-resources", StorageLocation.CONFIG_FILE),
    SETTINGS_PRELOAD_REPLENISH_POOL(false, "options.replenish-preload-cache", StorageLocation.CONFIG_FILE),
    SETTINGS_GC_STRATEGY(false, "options.gc-strategy", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_RADIUS(false, "options.voicechat-radius", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_TOGGLE_MIC_SWAP(false, "options.voicechat-toggle-mic-on-swap-and-sneak", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_USE_HOTBAR(false, "options.voicechat-send-messages-in-hotbar", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_AUTOCLAIM(false, "options.voicechat-autoclaim-on-start", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_MOD_ENABLED(false, "options.voicechat-moderation-support", StorageLocation.CONFIG_FILE),
    SETTINGS_MODERATION_TIMER(false, "options.voicechat-moderation-duration", StorageLocation.CONFIG_FILE),
    SETTINGS_SPEAKER_REDSTONE_TICK_ENABLED(false, "options.redstone-tick-speakers", StorageLocation.CONFIG_FILE),
    SETTINGS_SPEAKER_REDSTONE_TICK_INTERVAL(false, "options.redstone-tick-speakers-interval", StorageLocation.CONFIG_FILE),
    SETTINGS_IGNORE_REGIONS_WHILE_IN_VEHICLE(false, "options.ignore-regions-on-vehicles", StorageLocation.CONFIG_FILE),
    SETTINGS_HYDRATE_REGIONS_ON_BOOT(false, "options.hydrate-regions-on-boot", StorageLocation.CONFIG_FILE),

    SETTINGS_STATIC_CHANNELS_ENABLED(false, "static-channels.enabled", StorageLocation.CONFIG_FILE),
    SETTINGS_STATIC_CHANNELS_SHOW_IN_WEB_UI(false, "static-channels.show-in-webclient", StorageLocation.CONFIG_FILE),
    SETTINGS_STATIC_CHANNELS_BASE(false, "static-channels.list", StorageLocation.CONFIG_FILE),
    SETTINGS_CHANNEL_COMMAND_ENABLED(false, "options.enable-channel-command", StorageLocation.CONFIG_FILE),

    SETTINGS_VOICE_FILTERS_GAMEMODE(false, "vc-filter.require-same-gamemode", StorageLocation.CONFIG_FILE),
    SETTINGS_VOICE_FILTERS_TEAM(false, "vc-filter.require-common-team", StorageLocation.CONFIG_FILE),
    SETTINGS_VOICE_FILTERS_CHANNEL(false, "vc-filter.require-no-channel", StorageLocation.CONFIG_FILE),

    SETTINGS_BEDROCK_PREFIX(false, "options.bedrock-name-prefix", StorageLocation.CONFIG_FILE),
    SETTINGS_TOKEN_AUTO_LOGIN(false, "options.token-auto-login", StorageLocation.CONFIG_FILE),

    SETTINGS_AUTO_RECONNECT(false, "options.auto-reconnect", StorageLocation.CONFIG_FILE),

    SETTINGS_PAPI_CLIENT_CONNECTED(false, "papi.client-connected", StorageLocation.CONFIG_FILE),
    SETTINGS_PAPI_CLIENT_DISCONNECTED(false, "papi.client-disconnected", StorageLocation.CONFIG_FILE),
    SETTINGS_PAPI_VC_CONNECTED(false, "papi.voicechat-connected", StorageLocation.CONFIG_FILE),
    SETTINGS_PAPI_VC_DISCONNECTED(false, "papi.voicechat-disconnected", StorageLocation.CONFIG_FILE),

    DEBUG_LOG_STATE_CHANGES(false, "debug.log-state-changes", StorageLocation.DATA_FILE),

    AUTH_HOST(true, "keyset.server-ip", StorageLocation.DATA_FILE),
    AUTH_COUNTRY(true, "keyset.server-cc", StorageLocation.DATA_FILE),
    AUTH_PRIVATE_KEY(false, "keyset.private", StorageLocation.DATA_FILE),
    AUTH_PUBLIC_KEY(false, "keyset.public", StorageLocation.DATA_FILE),
    AUTH_KEY_VERSION(false, "keyset.key-version", StorageLocation.DATA_FILE),

    REDIS_ENABLED(false, "redis.enabled", StorageLocation.CONFIG_FILE),
    REDIS_HOST(false, "redis.host", StorageLocation.CONFIG_FILE),
    REDIS_PORT(false, "redis.port", StorageLocation.CONFIG_FILE),
    REDIS_PASSWORD(false, "redis.password", StorageLocation.CONFIG_FILE),
    REDIS_USE_SSL(false, "redis.useSSL", StorageLocation.CONFIG_FILE),
    REDIS_SECTION(false, "redis.section", StorageLocation.CONFIG_FILE),
    REDIS_SENTINEL_MASTER_SET(false, "redis.sentinel-master-set", StorageLocation.CONFIG_FILE),

    CDN_PREFERRED_PORT(false, "cdn.preferred-bridge-port", StorageLocation.CONFIG_FILE),
    CDN_TIMEOUT(false, "cdn.timeout-seconds", StorageLocation.CONFIG_FILE),
    CDN_IP_OVERWRITE(false, "cdn.ip-overwrite", StorageLocation.CONFIG_FILE),
    CDN_ENABLED(false, "cdn.enabled", StorageLocation.CONFIG_FILE),
    CDN_SKIP_VALIDATION(false, "cdn.skip-validation", StorageLocation.CONFIG_FILE),

    LEGAL_ACCEPTED_TOS_AND_PRIVACY(false, "legal.accepted", StorageLocation.DATA_FILE);

    @Getter
    private final String path;
    @Getter
    private final StorageLocation storageLocation;
    @Getter
    private final boolean isDeprecated;

    StorageKey(boolean isDeprecated, String path, StorageLocation storageLocation) {
        this.isDeprecated = isDeprecated;
        this.path = path;
        this.storageLocation = storageLocation;
    }

    public String getSubSection() {
        String[] elements = this.path.split("\\.");
        return elements[elements.length - 1];
    }

    public boolean getBoolean() {
        return OpenAudioMc.getInstance().getConfiguration().getBoolean(this);
    }

    public int getInt() {
        return OpenAudioMc.getInstance().getConfiguration().getInt(this);
    }

    public String getString() {
        return OpenAudioMc.getInstance().getConfiguration().getString(this);
    }

    public List<Map<String, Object>> getObjectList() {
        return OpenAudioMc.getInstance().getConfiguration().getObjectList(this.getPath(), this.getStorageLocation());
    }
}
