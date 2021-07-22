package com.craftmend.openaudiomc.spigot.modules.players;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.listeners.PlayerConnectionListener;
import com.craftmend.openaudiomc.spigot.modules.players.listeners.PlayerTeleportationListener;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.*;

public class PlayerService extends Service {

    @Inject
    private OpenAudioMcSpigot openAudioMcSpigot;

    private Map<UUID, SpigotConnection> spigotConnectionMap = new HashMap<>();

    public PlayerService() {
        openAudioMcSpigot.getServer().getPluginManager().registerEvents(new PlayerConnectionListener(), openAudioMcSpigot);
        openAudioMcSpigot.getServer().getPluginManager().registerEvents(new PlayerTeleportationListener(), openAudioMcSpigot);
    }

    /**
     * @param player registers the player
     */
    public void register(Player player) {
        ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).register(player);
        spigotConnectionMap.put(player.getUniqueId(), new SpigotConnection(player, clientConnection));
    }

    /**
     * @param uuid the uuid of a player
     * @return the client that corresponds to the player. can be null
     */
    public SpigotConnection getClient(UUID uuid) {
        SpigotConnection proposedSpigotConnection = spigotConnectionMap.get(uuid);

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
        return spigotConnectionMap.values();
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
        if (spigotConnectionMap.containsKey(player.getUniqueId())) {
            SpigotConnection spigotConnection = spigotConnectionMap.get(player.getUniqueId());
            spigotConnection.onDestroy();
            spigotConnectionMap.remove(player.getUniqueId());
        }

        OpenAudioMc.getService(NetworkingService.class).remove(player.getUniqueId());
    }
}
