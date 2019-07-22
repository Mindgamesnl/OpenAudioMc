package com.craftmend.openaudiomc.bungee.modules.player.listeners;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import net.md_5.bungee.api.event.PlayerDisconnectEvent;
import net.md_5.bungee.api.event.PostLoginEvent;
import net.md_5.bungee.api.plugin.Listener;
import net.md_5.bungee.event.EventHandler;

public class PlayerConnectionListener implements Listener {

    @EventHandler
    public void onPostLogin(PostLoginEvent event) {
        OpenAudioMcCore.getInstance().getNetworkingService().register(event.getPlayer());
    }

    @EventHandler
    public void onLogout(PlayerDisconnectEvent event) {
        OpenAudioMcCore.getInstance().getNetworkingService().remove(event.getPlayer().getUniqueId());
    }

}
