package com.craftmend.openaudiomc.modules.configuration.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bukkit.configuration.file.FileConfiguration;

import java.time.OffsetTime;

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

    public ClientSettings load() {
        FileConfiguration config = OpenAudioMc.getInstance().getConfig();
        title = config.getString("client.title");
        background = config.getString("client.background");
        welcomeMessage = config.getString("client.welcome-message");
        errorMessage = config.getString("client.error-message");
        hueConnected = config.getString("client.hue-connected");
        hueLinking = config.getString("client.hue-linking");
        hueBridgeFound = config.getString("client.hue-bridge-found");
        return this;
    }

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
