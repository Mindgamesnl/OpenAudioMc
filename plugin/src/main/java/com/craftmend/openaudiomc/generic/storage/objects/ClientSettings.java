package com.craftmend.openaudiomc.generic.storage.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Deprecated
public class ClientSettings {

    private String title = "default";
    private String background = "default";
    private String welcomeMessage = "default";
    private String errorMessage = "default";
    private String hueConnected = "default";
    private String hueLinking = "default";
    private String hueBridgeFound = "default;";

    /**
     * load the settings from the config file, and overwrite the default values if found
     *
     * @return ClientSettings
     */
    public ClientSettings load() {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();
        title = config.getString(StorageKey.SETTING_CLIENT_TITLE);
        background = config.getString(StorageKey.SETTING_CLIENT_BACKGROUND);
        welcomeMessage = config.getString(StorageKey.SETTING_CLIENT_WELCOME_TEXT);
        errorMessage = config.getString(StorageKey.SETTING_CLIENT_ERROR_TEXT);
        hueConnected = config.getString(StorageKey.SETTINGS_HUE_CONNECTED_TEXT);
        hueLinking = config.getString(StorageKey.SETTINGS_HUE_CONNECTING_TEXT);
        hueBridgeFound = config.getString(StorageKey.SETTINGS_HUE_AVAILABLE_TEXT);

        // if any of them seem to be dead, just reset them
        if (title.startsWith("<un")) title = "default";
        if (background.startsWith("<un")) background = "default";
        if (welcomeMessage.startsWith("<un")) welcomeMessage = "default";
        if (errorMessage.startsWith("<un")) errorMessage = "default";
        if (hueConnected.startsWith("<un")) hueConnected = "default";
        if (hueLinking.startsWith("<un")) hueLinking = "default";
        if (hueBridgeFound.startsWith("<un")) hueBridgeFound = "default";
        return this;
    }

    /**
     * @param other Compare the settings to other client settings
     * @return true if equal
     */
    public boolean equals(ClientSettings other) {
        return (other.getTitle().equals(getTitle())
                && other.getBackground().equals(getBackground())
                && other.getWelcomeMessage().equals(getWelcomeMessage())
                && other.getErrorMessage().equals(getErrorMessage())
                && other.getHueBridgeFound().equals(getHueBridgeFound())
                && other.getHueConnected().equals(getHueConnected())
                && other.getHueLinking().equals(getHueLinking()));
    }

    public boolean hasValues() {
        if (!title.equals("default")) return true;
        if (!background.equals("default")) return true;
        if (!welcomeMessage.equals("default")) return true;
        if (!errorMessage.equals("default")) return true;
        if (!hueConnected.equals("default")) return true;
        if (!hueLinking.equals("default")) return true;
        if (!hueBridgeFound.equals("default")) return true;
        return false;
    }

}
