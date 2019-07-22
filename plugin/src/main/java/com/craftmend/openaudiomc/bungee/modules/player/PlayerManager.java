package com.craftmend.openaudiomc.bungee.modules.player;

import com.craftmend.openaudiomc.bungee.modules.player.listeners.PlayerConnectionLIstener;
import net.md_5.bungee.api.plugin.Plugin;

public class PlayerManager {

    public PlayerManager(Plugin plugin) {
        plugin.getProxy().getPluginManager().registerListener(plugin, new PlayerConnectionLIstener());
    }

}
