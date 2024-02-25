package com.craftmend.openaudiomc.vistas.client.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.vistas.client.Vistas;
import com.craftmend.openaudiomc.vistas.client.client.VistasRedisClient;
import com.craftmend.openaudiomc.vistas.client.redis.packets.UserJoinPacket;
import com.craftmend.openaudiomc.vistas.client.redis.packets.UserLeavePacket;
import org.bukkit.Bukkit;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class PlayerListener implements Listener {

    private Map<UUID, Integer> joinCancels = new ConcurrentHashMap<>();
    private Vistas module;

    public PlayerListener(Vistas plugin) {
        this.module = plugin;
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        // delay one second to prevent fuckery lol
        int task = OpenAudioMcSpigot.getInstance().getServer().getScheduler().runTaskLaterAsynchronously(OpenAudioMcSpigot.getInstance(), () -> {
            // get user for this player
            User user = OpenAudioMc.resolveDependency(UserHooks.class).byUuid(event.getPlayer().getUniqueId());

            if (user == null) {
                OpenAudioLogger.warn("Vistas player join user is null");
                return;
            }

            OpenAudioMc.getService(VistasRedisClient.class).sendPacket(
                    new UserJoinPacket(
                            event.getPlayer().getName(),
                            event.getPlayer().getUniqueId(),
                            module.getServerId(),
                            user.getIpAddress()
                    )
            );
            joinCancels.remove(event.getPlayer().getUniqueId());
        }, 40).getTaskId(); // 2 seconds
        joinCancels.put(event.getPlayer().getUniqueId(), task);
    }

    @EventHandler
    public void onPlayerQuit(PlayerQuitEvent event) {
        if (joinCancels.containsKey(event.getPlayer().getUniqueId())) {
            Bukkit.getScheduler().cancelTask(joinCancels.get(event.getPlayer().getUniqueId()));
            joinCancels.remove(event.getPlayer().getUniqueId());
        }

        OpenAudioMc.getService(VistasRedisClient.class).sendPacket(
                new UserLeavePacket(
                        event.getPlayer().getName(),
                        event.getPlayer().getUniqueId(),
                        module.getServerId()
                )
        );
    }

}
