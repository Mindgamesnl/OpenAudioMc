package com.craftmend.openaudiomc.spigot.modules.players;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.commands.ConnectCommand;
import com.craftmend.openaudiomc.spigot.modules.players.listeners.PlayerConnectionListener;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.*;

public class PlayerModule {

    public PlayerModule(OpenAudioMcSpigot openAudioMcSpigot) {
        openAudioMcSpigot.getServer().getPluginManager().registerEvents(new PlayerConnectionListener(), openAudioMcSpigot);
        openAudioMcSpigot.getCommand("audio").setExecutor(new ConnectCommand(openAudioMcSpigot));
    }

    /**
     * @param player registers the player
     */
    public void register(Player player) {
        clientMap.put(player.getUniqueId(), new SpigotConnection(player));
    }

    /**
     * @param uuid the uuid of a player
     * @return the client that corresponds to the player. can be null
     */
    public SpigotConnection getClient(UUID uuid) {
        SpigotConnection proposedSpigotConnection = clientMap.get(uuid);

        if (proposedSpigotConnection != null) return proposedSpigotConnection;

        // check if the player is real
        Player target = Bukkit.getPlayer(uuid);
        if (target != null && target.isOnline()) {
            register(target);
            return getClient(uuid);
        }

        return null;
    }

    /**
     * @return a collection of all clients
     */
    public Collection<SpigotConnection> getClients() {
        return clientMap.values();
    }

    /**
     * @param player target player
     * @return the connection of the player
     */
    public SpigotConnection getClient(Player player) {
        return getClient(player.getUniqueId());
    }

    /**
     * @param player the player to unregister
     */
    public void remove(Player player) {
        if (clientMap.containsKey(player.getUniqueId())) {
            SpigotConnection spigotConnection = clientMap.get(player.getUniqueId());
            spigotConnection.kick();
            spigotConnection.onDestroy();
            clientMap.remove(player.getUniqueId());
        }
    }
}
