package com.craftmend.openaudiomc.spigot.modules.proxy;

import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.utils.data.EnvironmentHelper;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import lombok.Getter;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

import java.io.File;

public class ProxyModule extends Service {

    public OAClientMode getMode() {
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

        // new bullshit 1.19 paper config
        File paperConfigFile = new File("config/paper-global.yml");
        if (!proxyMode && paperConfigFile.exists()) {
            FileConfiguration yamlConfiguration = YamlConfiguration.loadConfiguration(paperConfigFile);
            proxyMode = yamlConfiguration.getBoolean("proxies.velocity.enabled");
            if (!proxyMode) {
                proxyMode = yamlConfiguration.getBoolean("proxies.bungee-cord.enabled");
            }
        }

        // is it minehut? then force if
        if (EnvironmentHelper.contains("minehut") || MagicValue.FORCE_SERVER_STANDALONE.get(Boolean.class)) {
            OpenAudioLogger.toConsole("Starting in standalone mode due to minehut containers or it being forced");
            return OAClientMode.STAND_ALONE;
        }

        if (MagicValue.FORCE_SERVER_NODE.get(Boolean.class)) {
            return OAClientMode.NODE;
        }

        if (proxyMode) {
            return OAClientMode.NODE;
        } else {
            return OAClientMode.STAND_ALONE;
        }
    }

    @Override
    public void onEnable() {

    }
}
