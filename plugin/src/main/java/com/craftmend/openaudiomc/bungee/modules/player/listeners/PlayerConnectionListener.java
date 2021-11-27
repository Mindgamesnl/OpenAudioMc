package com.craftmend.openaudiomc.bungee.modules.player.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.platform.BungeeProxyNode;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.proxy.ProxyHostService;
import com.craftmend.openaudiomc.generic.user.adapters.BungeeUserAdapter;
import net.md_5.bungee.api.event.PlayerDisconnectEvent;
import net.md_5.bungee.api.event.PostLoginEvent;
import net.md_5.bungee.api.event.ServerSwitchEvent;
import net.md_5.bungee.api.plugin.Listener;
import net.md_5.bungee.event.EventHandler;

/**
 * This implements all player based interactions on the bungeecord network
 * (session tracking, descriptions, packet routing and state synchronization)
 */
public class PlayerConnectionListener implements Listener {

    @EventHandler
    public void onPostLogin(PostLoginEvent event) {
        OpenAudioMc.getService(NetworkingService.class).register(new BungeeUserAdapter(event.getPlayer()), null);
    }

    @EventHandler
    public void onLogout(PlayerDisconnectEvent event) {
        OpenAudioMc.getService(NetworkingService.class).remove(event.getPlayer().getUniqueId());
    }

    @EventHandler
    public void onSwitch(ServerSwitchEvent event) {
        OpenAudioMc.getService(ProxyHostService.class).onServerSwitch(
                new BungeeUserAdapter(event.getPlayer()),
                null,
                new BungeeProxyNode(event.getPlayer().getServer().getInfo())
        );


    }

}
