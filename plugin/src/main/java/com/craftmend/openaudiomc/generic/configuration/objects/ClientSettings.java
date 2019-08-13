package com.craftmend.openaudiomc.generic.configuration.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.generic.interfaces.ConfigurationInterface;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientSettings {

    private String title = "default";
    private String background = "default";
    private String welcomeMessage = "default";
    private String errorMessage = "default";
    private String hueConnected = "default";
    private String hueLinking = "default";
    private String hueBridgeFound = "default;";
    private String ambianceSound = null;

    /**
     * load the settings from the config file, and overwrite the default values if found
     *
     * @return ClientSettings
     */
    public ClientSettings load() {
        ConfigurationInterface config = OpenAudioMc.getInstance().getConfigurationInterface();
        title = config.getString(StorageKey.SETTING_CLIENT_TITLE);
        background = config.getString(StorageKey.SETTING_CLIENT_BACKGROUND);
        welcomeMessage = config.getString(StorageKey.SETTING_CLIENT_WELCOME_TEXT);
        errorMessage = config.getString(StorageKey.SETTING_CLIENT_ERROR_TEXT);
        hueConnected = config.getString(StorageKey.SETTINGS_HUE_CONNECTED_TEXT);
        hueLinking = config.getString(StorageKey.SETTINGS_HUE_CONNECTING_TEXT);
        hueBridgeFound = config.getString(StorageKey.SETTINGS_HUE_AVAILABLE_TEXT);
        return this;
    }

    /**
     * @param other Compare the settings to other client settings
     * @return true if equal
     */
    public Boolean equals(ClientSettings other) {
        return (other.getTitle().equals(getTitle())
                && other.getBackground().equals(getBackground())
                && other.getWelcomeMessage().equals(getWelcomeMessage())
                && other.getErrorMessage().equals(getErrorMessage())
                && other.getHueBridgeFound().equals(getHueBridgeFound())
                && other.getHueConnected().equals(getHueConnected())
                && other.getHueLinking().equals(getHueLinking()));
    }

}
