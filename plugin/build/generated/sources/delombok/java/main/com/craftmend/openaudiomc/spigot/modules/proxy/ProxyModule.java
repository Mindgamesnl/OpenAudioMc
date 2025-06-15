package com.craftmend.openaudiomc.spigot.modules.proxy;

import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.data.EnvironmentHelper;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import java.io.File;

public class ProxyModule extends Service {
    private OAClientMode mode = OAClientMode.STAND_ALONE;

    public void refresh() {
        // overwrite cached mode
        onEnable();
    }

    @Override
    public void onEnable() {
        if (MagicValue.FORCE_SERVER_NODE.get(Boolean.class)) {
            mode = OAClientMode.NODE;
            return;
        }
        // resolve based on settings first
        // is local mode enabled?
        if (StorageKey.SETTINGS_FORCE_OFFLINE_MODE.getBoolean()) {
            mode = OAClientMode.STAND_ALONE;
            return;
        }
        // fallback, try to resolve from environment
        if (isRunningProxy()) {
            mode = OAClientMode.NODE;
            return;
        }
        // default to stand alone
        mode = OAClientMode.STAND_ALONE;
    }

    private boolean isRunningProxy() {
        boolean proxyMode = false;
        // if paper is user, checking for velocity support
        File paperYml = new File("paper.yml");
        if (paperYml.exists()) {
            YamlConfiguration paperConfiguration = YamlConfiguration.loadConfiguration(paperYml);
            proxyMode = paperConfiguration.getBoolean("settings.velocity-support.enabled");
        }
        // if proxy mode is false, checking for legacy bungeecord support
        // this enables bungeecord support if paper is used
        if (!proxyMode) {
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
        return proxyMode;
    }

    public OAClientMode getMode() {
        return this.mode;
    }
}
