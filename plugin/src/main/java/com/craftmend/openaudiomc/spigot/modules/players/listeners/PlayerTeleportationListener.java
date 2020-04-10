package com.craftmend.openaudiomc.spigot.modules.players.listeners;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.event.player.PlayerTeleportEvent;

public class PlayerTeleportationListener implements Listener {

    @EventHandler
    public void onJoin(PlayerTeleportEvent event) {
        SpigotConnection spigotConnection = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(event.getPlayer());
        if (spigotConnection.getRegionHandler() != null) {
            spigotConnection.getRegionHandler().tick();
        }
        spigotConnection.getSpeakerHandler().tick();
    }

}
