package com.craftmend.openaudiomc.generic.storage.enums;

import lombok.Getter;

public enum StorageKey {

    MESSAGE_PROMPT_TO_CONNECT("messages.suggest-connection", StorageLocation.CONFIG_FILE),
    MESSAGE_CLICK_TO_CONNECT("messages.click-to-connect", StorageLocation.CONFIG_FILE),
    MESSAGE_LINK_EXPIRED("messages.click-link-expired", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_CLOSED("messages.client-closed", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_OPENED("messages.client-opened", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_VOLUME_CHANGED("messages.client-volume-change", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_VOLUME_INVALID("messages.client-volume-invalid", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_NOT_CONNECTED("messages.client-not-connected", StorageLocation.CONFIG_FILE),
    MESSAGE_CLIENT_ALREADY_CONNECTED("messages.client-already-connected", StorageLocation.CONFIG_FILE),
    MESSAGE_CALL_RINGING("messages.call-ringing", StorageLocation.CONFIG_FILE),
    MESSAGE_CALL_ENDED("messages.call-left", StorageLocation.CONFIG_FILE),
    MESSAGE_API_BOOTING("messages.api-starting-up", StorageLocation.CONFIG_FILE),
    MESSAGE_PROPOSE_CLIENT("messages.suggest-connection", StorageLocation.CONFIG_FILE),

    SETTING_CLIENT_TITLE("client.title", StorageLocation.CONFIG_FILE),
    SETTING_CLIENT_BACKGROUND("client.background", StorageLocation.CONFIG_FILE),
    SETTING_CLIENT_WELCOME_TEXT("client.welcome-message", StorageLocation.CONFIG_FILE),
    SETTING_CLIENT_ERROR_TEXT("client.error-message", StorageLocation.CONFIG_FILE),
    SETTINGS_HUE_CONNECTED_TEXT("client.hue-connected", StorageLocation.CONFIG_FILE),
    SETTINGS_HUE_CONNECTING_TEXT("client.hue-linking", StorageLocation.CONFIG_FILE),
    SETTINGS_HUE_AVAILABLE_TEXT("client.hue-bridge-found", StorageLocation.CONFIG_FILE),
    SETTINGS_CLIENT_START_SOUND("client.start-sound", StorageLocation.CONFIG_FILE),

    SETTINGS_REMIND_TO_CONNECT("options.remind-to-connect", StorageLocation.CONFIG_FILE),
    SETTINGS_REMIND_TO_CONNECT_INTERVAL("options.remind-to-connect-interval", StorageLocation.CONFIG_FILE),
    SETTINGS_REGIONS_SYNC("options.sync-regions", StorageLocation.CONFIG_FILE),
    SETTINGS_SPEAKER_SYNC("options.sync-speakers", StorageLocation.CONFIG_FILE),
    SETTINGS_SPEAKER_RANGE("options.speaker-radius", StorageLocation.CONFIG_FILE),
    SETTINGS_SEND_URL_ON_JOIN("options.send-on-join", StorageLocation.CONFIG_FILE),
    SETTINGS_USE_WG_PRIORITY("options.use-region-priority", StorageLocation.CONFIG_FILE),

    DEBUG_LOG_STATE_CHANGES("debug.log-state-changes", StorageLocation.DATA_FILE),

    AUTH_PRIVATE_KEY("keyset.private", StorageLocation.DATA_FILE),
    AUTH_PUBLIC_KEY("keyset.public", StorageLocation.DATA_FILE),
    AUTH_PUBLIC_URL("keyset.base-url", StorageLocation.DATA_FILE),
    AUTH_KEY_VERSION("keyset.key-version", StorageLocation.DATA_FILE),

    OPTIONS_SOCKET_MODE("keyset.link-mode", StorageLocation.DATA_FILE)
    ;

    @Getter private String path;
    @Getter private StorageLocation storageLocation;
    StorageKey(String path, StorageLocation storageLocation) {
        this.path = path;
        this.storageLocation = storageLocation;
    }
}
