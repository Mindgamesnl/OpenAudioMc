package com.craftmend.openaudiomc.spigot.modules.proxy;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.utils.data.EnvironmentHelper;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.Getter;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

import java.io.File;

public class ProxyModule extends Service {

    @Getter private final ClientMode mode;

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

        // is it minehut? then force if
        if (EnvironmentHelper.contains("minehut")) {
            OpenAudioLogger.toConsole("Starting in standalone mode due to minehut");
            mode = ClientMode.STAND_ALONE;
            return;
        }

        if (proxyMode) {
            OpenAudioLogger.toConsole("Starting in bungee mode");
            mode = ClientMode.NODE;
        } else {
            OpenAudioLogger.toConsole("Starting in socket mode");
            mode = ClientMode.STAND_ALONE;
        }
    }

    @Override
    public void onEnable() {

    }
}
