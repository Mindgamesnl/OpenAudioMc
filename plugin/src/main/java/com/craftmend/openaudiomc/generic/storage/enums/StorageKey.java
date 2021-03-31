package com.craftmend.openaudiomc.generic.storage.enums;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Getter;

public enum StorageKey {

    MESSAGE_GENERATING_SESSION(false, "messages.preparing-session", StorageLocation.CONFIG_FILE),
    MESSAGE_SESSION_ERROR(false, "messages.session-error", StorageLocation.CONFIG_FILE),
    MESSAGE_PROMPT_TO_CONNECT(false, "messages.suggest-connection", StorageLocation.CONFIG_FILE),
    MESSAGE_CLICK_TO_CONNECT(false, "messages.click-to-connect", StorageLocation.CONFIG_FILE),
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
    MESSAGE_VC_USER_LEFT(false, "messages.voicechat-removed-user", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_MIC_MUTE(false, "messages.voicechat-mic-mute", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_MIC_UNMUTE(false, "messages.voicechat-mic-unmute", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_NOT_CONNECTED(false, "messages.voice-not-connected", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_UNSTABLE(false, "messages.voicechat-service-unstable", StorageLocation.CONFIG_FILE),
    MESSAGE_VC_RECOVERED(false, "messages.voicechat-service-recovered", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_ANNOUNCEMENTS(false, "options.voicechat-announcements", StorageLocation.CONFIG_FILE),

    SETTINGS_REMIND_TO_CONNECT(false, "options.remind-to-connect", StorageLocation.CONFIG_FILE),
    SETTINGS_REMIND_TO_CONNECT_INTERVAL(false, "options.remind-to-connect-interval", StorageLocation.CONFIG_FILE),
    SETTINGS_REGIONS_SYNC(false, "options.sync-regions", StorageLocation.CONFIG_FILE),
    SETTINGS_SPEAKER_SYNC(false, "options.sync-speakers", StorageLocation.CONFIG_FILE),
    SETTINGS_SPEAKER_RANGE(false, "options.speaker-radius", StorageLocation.CONFIG_FILE),
    SETTINGS_SEND_URL_ON_JOIN(false, "options.send-on-join", StorageLocation.CONFIG_FILE),
    SETTINGS_USE_WG_PRIORITY(false, "options.use-region-priority", StorageLocation.CONFIG_FILE),
    SETTINGS_PLUS_ACCESS_LEVEL(false, "options.plus-access-level", StorageLocation.CONFIG_FILE),
    SETTINGS_STAFF_TIPS(false, "options.staff-tips", StorageLocation.CONFIG_FILE),
    SETTINGS_NOTIFY_UPDATES(false, "options.notify-updates", StorageLocation.CONFIG_FILE),
    SETTINGS_NOTIFY_ANNOUNCEMENTS(false, "options.notify-announcements", StorageLocation.CONFIG_FILE),
    SETTINGS_PRELOAD_SOUNDS(false, "options.preload-resources", StorageLocation.CONFIG_FILE),
    SETTINGS_GC_STRATEGY(false, "options.gc-strategy", StorageLocation.CONFIG_FILE),
    SETTINGS_VC_RADIUS(false, "options.voicechat-radius", StorageLocation.CONFIG_FILE),

    DEBUG_LOG_STATE_CHANGES(false, "debug.log-state-changes", StorageLocation.DATA_FILE),

    AUTH_HOST(false, "keyset.server-ip", StorageLocation.DATA_FILE),
    AUTH_COUNTRY(false, "keyset.server-cc", StorageLocation.DATA_FILE),
    AUTH_PRIVATE_KEY(false, "keyset.private", StorageLocation.DATA_FILE),
    AUTH_PUBLIC_KEY(false, "keyset.public", StorageLocation.DATA_FILE),
    AUTH_KEY_VERSION(false, "keyset.key-version", StorageLocation.DATA_FILE),

    REDIS_ENABLED(false, "redis.enabled", StorageLocation.CONFIG_FILE),
    REDIS_HOST(false, "redis.host", StorageLocation.CONFIG_FILE),
    REDIS_PORT(false, "redis.port", StorageLocation.CONFIG_FILE),
    REDIS_PASSWORD(false, "redis.password", StorageLocation.CONFIG_FILE),
    REDIS_USE_SSL(false, "redis.useSSL", StorageLocation.CONFIG_FILE),
    REDIS_SECTION(false, "redis.section", StorageLocation.CONFIG_FILE),

    LEGAL_ACCEPTED_TOS_AND_PRIVACY(false, "legal.accepted", StorageLocation.DATA_FILE),

    @Deprecated SETTING_CLIENT_TITLE(true, "client.title", StorageLocation.CONFIG_FILE),
    @Deprecated SETTING_CLIENT_BACKGROUND(true, "client.background", StorageLocation.CONFIG_FILE),
    @Deprecated SETTING_CLIENT_WELCOME_TEXT(true, "client.welcome-message", StorageLocation.CONFIG_FILE),
    @Deprecated SETTING_CLIENT_ERROR_TEXT(true, "client.error-message", StorageLocation.CONFIG_FILE),
    @Deprecated SETTINGS_HUE_CONNECTED_TEXT(true, "client.hue-connected", StorageLocation.CONFIG_FILE),
    @Deprecated SETTINGS_HUE_CONNECTING_TEXT(true, "client.hue-linking", StorageLocation.CONFIG_FILE),
    @Deprecated SETTINGS_HUE_AVAILABLE_TEXT(true, "client.hue-bridge-found", StorageLocation.CONFIG_FILE),
    @Deprecated SETTINGS_CLIENT_START_SOUND(true, "client.start-sound", StorageLocation.CONFIG_FILE),
    @Deprecated SETTINGS_LOOP_TEMP_REGIONS(true, "options.loop-temp-regions", StorageLocation.CONFIG_FILE),
    @Deprecated MESSAGE_LEGACY_CALL_RINGING(true, "messages.call-ringing", StorageLocation.CONFIG_FILE),
    @Deprecated MESSAGE_LEGACY_CALL_ENDED(true, "messages.call-left", StorageLocation.CONFIG_FILE),
    @Deprecated MESSAGE_API_BOOTING(true, "messages.voicechat-enabled", StorageLocation.CONFIG_FILE),
    ;

    @Getter private String path;
    @Getter private StorageLocation storageLocation;
    @Getter private boolean isDeprecated;
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
}
