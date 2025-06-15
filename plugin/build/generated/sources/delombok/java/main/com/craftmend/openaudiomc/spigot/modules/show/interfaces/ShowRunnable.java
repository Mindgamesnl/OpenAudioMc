package com.craftmend.openaudiomc.spigot.modules.show.interfaces;

import org.bukkit.Bukkit;
import org.bukkit.Chunk;
import org.bukkit.World;
import org.bukkit.entity.Entity;
import org.bukkit.entity.Player;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public abstract class ShowRunnable implements Runnable {
    private static final transient Map<String, Entity> executorEntityCache = new HashMap<>();

    public ShowRunnable() {
    }

    public abstract void prepare(String serialize, World world);

    public abstract String serialize();

    private boolean executedFromRedis = false;

    protected Entity getExecutorEntity(String world) {
        Entity fromCache = executorEntityCache.get(world);
        if (fromCache != null && !fromCache.isDead() && fromCache.getLocation().getChunk().isLoaded()) {
            return fromCache;
        }
        for (Chunk loadedChunk : Objects.requireNonNull(Bukkit.getWorld(world)).getLoadedChunks()) {
            for (Entity entity : loadedChunk.getEntities()) {
                // filter players out
                if (!(entity instanceof Player)) {
                    // must be alive
                    if (!entity.isDead()) {
                        executorEntityCache.put(world, entity);
                        return entity;
                    }
                }
            }
        }
        return null;
    }

    public void setExecutedFromRedis(final boolean executedFromRedis) {
        this.executedFromRedis = executedFromRedis;
    }

    public boolean isExecutedFromRedis() {
        return this.executedFromRedis;
    }
}
