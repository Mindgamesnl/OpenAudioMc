package com.craftmend.openaudiomc.spigot.modules.proxy;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.Getter;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

import java.io.File;

public class ProxyModule {

    @Getter private ClientMode mode;

    public ProxyModule() {
        FileConfiguration yamlConfiguration = YamlConfiguration.loadConfiguration(new File("spigot.yml"));

        boolean bungeeMode = yamlConfiguration.getBoolean("settings.bungeecord");

        if (bungeeMode) {
            OpenAudioLogger.toConsole("Starting in bungee mode");
            mode = ClientMode.NODE;
        } else {
            OpenAudioLogger.toConsole("Starting in socket mode");
            mode = ClientMode.STAND_ALONE;
        }
    }

}
