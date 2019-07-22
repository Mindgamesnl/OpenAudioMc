package com.craftmend.openaudiomc.spigot.modules.configuration.objects;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bukkit.configuration.file.FileConfiguration;

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
        FileConfiguration config = OpenAudioMcSpigot.getInstance().getConfig();
        title = config.getString("client.title");
        background = config.getString("client.background");
        welcomeMessage = config.getString("client.welcome-message");
        errorMessage = config.getString("client.error-message");
        hueConnected = config.getString("client.hue-connected");
        hueLinking = config.getString("client.hue-linking");
        hueBridgeFound = config.getString("client.hue-bridge-found");
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
