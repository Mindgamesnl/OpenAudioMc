package com.craftmend.openaudiomc.spigot.modules.players;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.commands.ConnectCommand;
import com.craftmend.openaudiomc.spigot.modules.players.listeners.PlayerConnectionListener;
import com.craftmend.openaudiomc.spigot.modules.players.objects.Client;

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
        clientMap.put(player.getUniqueId(), new Client(player));
    }

    /**
     * @param uuid the uuid of a player
     * @return the client that corresponds to the player. can be null
     */
    public Client getClient(UUID uuid) {
        Client proposedClient = clientMap.get(uuid);

        if (proposedClient != null) return proposedClient;

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
    public Collection<Client> getClients() {
        return clientMap.values();
    }

    /**
     * @param player target player
     * @return the connection of the player
     */
    public Client getClient(Player player) {
        return getClient(player.getUniqueId());
    }

    /**
     * @param player the player to unregister
     */
    public void remove(Player player) {
        if (clientMap.containsKey(player.getUniqueId())) {
            Client client = clientMap.get(player.getUniqueId());
            client.kick();
            client.onDestroy();
            clientMap.remove(player.getUniqueId());
        }
    }
}
