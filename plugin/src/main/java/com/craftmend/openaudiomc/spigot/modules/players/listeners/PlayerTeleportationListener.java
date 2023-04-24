package com.craftmend.openaudiomc.spigot.modules.players.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerTeleportEvent;

public class PlayerTeleportationListener implements Listener {

    @EventHandler
    public void onTp(PlayerTeleportEvent event) {
        // this event might be called before the player is registered, as some plugins use
        // the teleport event to warp them to spawn, instead of the player spawn event
        if (!OpenAudioMc.getService(SpigotPlayerService.class).hasClient(event.getPlayer())) return;

        SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(event.getPlayer());
        if (spigotConnection == null) return;
        if (spigotConnection.getRegionHandler() != null) {
            spigotConnection.getRegionHandler().tick();
        }
        spigotConnection.getSpeakerHandler().tick();
    }

}
