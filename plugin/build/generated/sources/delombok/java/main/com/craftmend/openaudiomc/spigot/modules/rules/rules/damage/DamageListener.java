package com.craftmend.openaudiomc.spigot.modules.rules.rules.damage;

import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.EntityDamageByEntityEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class DamageListener implements Listener {
    private final Map<UUID, Instant> damageTimeMap = new HashMap<>();

    public boolean isPlayerDamaged(Player player, int timeframeSeconds) {
        if (!damageTimeMap.containsKey(player.getUniqueId())) return false;
        Instant l = damageTimeMap.get(player.getUniqueId());
        return Duration.between(l, Instant.now()).getSeconds() <= timeframeSeconds;
    }

    @EventHandler
    public void onQuit(PlayerQuitEvent event) {
        damageTimeMap.remove(event.getPlayer().getUniqueId());
    }

    @EventHandler
    public void onDamage(EntityDamageByEntityEvent event) {
        if (!(event.getEntity() instanceof Player)) return;
        damageTimeMap.put(event.getEntity().getUniqueId(), Instant.now());
    }

    public Map<UUID, Instant> getDamageTimeMap() {
        return this.damageTimeMap;
    }
}
