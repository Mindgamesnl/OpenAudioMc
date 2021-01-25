package com.craftmend.openaudiomc.spigot.modules.show.interfaces;

import lombok.Getter;
import lombok.Setter;
import org.bukkit.Bukkit;
import org.bukkit.Chunk;
import org.bukkit.World;
import org.bukkit.entity.Entity;
import org.bukkit.entity.Player;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public abstract class ShowRunnable implements Runnable {

    private final static transient Map<String, Entity> executorEntityCache = new HashMap<>();

    public ShowRunnable() {}

    abstract public void prepare(String serialize, World world);
    abstract public String serialize();
    @Setter @Getter private boolean executedFromRedis = false;

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

}
