package com.craftmend.openaudiomc.spigot.modules.proxy;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.Getter;
import org.bukkit.Bukkit;

public class ProxyModule {

    @Getter private ClientMode mode;

    public ProxyModule() {
        if (OpenAudioMc.getInstance().getConfigurationInterface().getBoolean(StorageKey.OPTIONS_SOCKET_MODE) || Bukkit.spigot().getConfig().getBoolean("settings.bungeecord")) {
            mode = ClientMode.STAND_ALONE;
        } else {
            mode = ClientMode.NODE;
        }
    }

}
