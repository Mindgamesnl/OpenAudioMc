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
        boolean proxyMode = false;

        // if paper is user, checking for velocity support
        File paperYml = new File("paper.yml");
        if(paperYml.exists()){
            YamlConfiguration paperConfiguration = YamlConfiguration.loadConfiguration(paperYml);
            proxyMode = paperConfiguration.getBoolean("settings.velocity-support.enabled");
        }

        // if proxy mode is false, checking for legacy bungeecord support
        // this enables bungeecord support if paper is used
        if(!proxyMode) {
            FileConfiguration yamlConfiguration = YamlConfiguration.loadConfiguration(new File("spigot.yml"));
            proxyMode = yamlConfiguration.getBoolean("settings.bungeecord");
        }

        if (proxyMode) {
            OpenAudioLogger.toConsole("Starting in bungee mode");
            mode = ClientMode.NODE;
        } else {
            OpenAudioLogger.toConsole("Starting in socket mode");
            mode = ClientMode.STAND_ALONE;
        }
    }

}
