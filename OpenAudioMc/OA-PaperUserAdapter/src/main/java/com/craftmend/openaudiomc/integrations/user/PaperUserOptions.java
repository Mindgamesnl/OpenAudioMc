package com.craftmend.openaudiomc.integrations.user;

public class PaperUserOptions {

    // StorageKey.SETTINGS_TOKEN_AUTO_LOGIN.getBoolean()
    private boolean isAutoLoginEnabled = true;
    // MagicValue.FORCE_DISABLE_CLIENT_NET_LOOKUP.get(Boolean.class)
    private boolean isClientNetLookupDisabled = false;

    public PaperUserOptions(boolean isAutoLoginEnabled, boolean isClientNetLookupDisabled) {
        this.isAutoLoginEnabled = isAutoLoginEnabled;
        this.isClientNetLookupDisabled = isClientNetLookupDisabled;
    }

    public boolean isAutoLoginEnabled() {
        return isAutoLoginEnabled;
    }

    public boolean isClientNetLookupDisabled() {
        return isClientNetLookupDisabled;
    }
}
