package com.craftmend.openaudiomc.spigot.modules.players.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class PlayerConnectionListener implements Listener {

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        OpenAudioMc.getService(SpigotPlayerService.class).register(event.getPlayer());
    }

    @EventHandler
    public void onQuit(PlayerQuitEvent event) {
        OpenAudioMc.getService(SpigotPlayerService.class).remove(event.getPlayer());
    }

}
