package com.craftmend.openaudiomc.spigot.modules.players.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.PlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerTeleportEvent;

public class PlayerTeleportationListener implements Listener {

    @EventHandler
    public void onTp(PlayerTeleportEvent event) {
        SpigotConnection spigotConnection = OpenAudioMc.getService(PlayerService.class).getClient(event.getPlayer());
        if (spigotConnection == null) return;
        if (spigotConnection.getRegionHandler() != null) {
            spigotConnection.getRegionHandler().tick();
        }
        spigotConnection.getSpeakerHandler().tick();
    }

}
