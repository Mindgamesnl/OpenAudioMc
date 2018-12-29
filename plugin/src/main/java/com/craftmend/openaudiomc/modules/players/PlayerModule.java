package com.craftmend.openaudiomc.modules.players;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.players.commands.ConnectCommand;
import com.craftmend.openaudiomc.modules.players.listeners.PlayerConnectionListener;
import com.craftmend.openaudiomc.modules.players.objects.Client;

import org.bukkit.entity.Player;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class PlayerModule {

    private Map<UUID, Client> clientMap = new HashMap<>();

    public PlayerModule(OpenAudioMc openAudioMc) {
        openAudioMc.getServer().getPluginManager().registerEvents(new PlayerConnectionListener(), openAudioMc);
        openAudioMc.getCommand("audio").setExecutor(new ConnectCommand());
    }

    public void register(Player player) {
        clientMap.put(player.getUniqueId(), new Client(player));
    }

    public Client getClient(UUID uuid) {
        return clientMap.get(uuid);
    }

    public Client getClient(Player player) {
        return getClient(player.getUniqueId());
    }

    public void remove(Player player) {
        if (clientMap.containsKey(player.getUniqueId())) {
            clientMap.get(player.getUniqueId()).onQuit();
            clientMap.remove(player.getUniqueId());
        }
    }
}
