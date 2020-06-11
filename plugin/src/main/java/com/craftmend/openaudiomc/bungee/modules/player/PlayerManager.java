package com.craftmend.openaudiomc.bungee.modules.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.player.events.ClientConnectEvent;
import com.craftmend.openaudiomc.bungee.modules.player.events.ClientDisconnectEvent;
import com.craftmend.openaudiomc.bungee.modules.player.listeners.PlayerConnectionListener;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.plugin.Plugin;

public class PlayerManager {

    public PlayerManager(Plugin plugin) {
        plugin.getProxy().getPluginManager().registerListener(plugin, new PlayerConnectionListener());

        OpenAudioMc.getInstance().getNetworkingService().addEventHandler(new INetworkingEvents() {
            @Override
            public void onClientOpen(Authenticatable target) {
                ProxyServer.getInstance().getPluginManager().callEvent(new ClientConnectEvent(target));
            }

            @Override
            public void onClientClose(Authenticatable target) {
                ProxyServer.getInstance().getPluginManager().callEvent(new ClientDisconnectEvent(target));
            }
        });
    }

}
