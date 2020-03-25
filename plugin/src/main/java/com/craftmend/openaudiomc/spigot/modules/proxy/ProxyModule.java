package com.craftmend.openaudiomc.spigot.modules.proxy;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.loggin.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

import java.io.File;
import java.time.Duration;

public class ProxyModule {

    @Getter private ClientMode mode;

    public ProxyModule() {

        FileConfiguration yamlConfiguration = YamlConfiguration.loadConfiguration(new File("spigot.yml"));

        Boolean bungeeMode = yamlConfiguration.getBoolean("settings.bungeecord");

        if (bungeeMode != null && bungeeMode) {
            OpenAudioLogger.toConsole("Starting in bungee mode");
            mode = ClientMode.NODE;
        } else {
            OpenAudioLogger.toConsole("Starting in socket mode");
            mode = ClientMode.STAND_ALONE;
        }
    }

}
