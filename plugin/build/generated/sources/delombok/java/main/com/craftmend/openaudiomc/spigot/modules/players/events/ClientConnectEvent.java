package com.craftmend.openaudiomc.spigot.modules.players.events;

import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.entity.Player;
import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class ClientConnectEvent extends Event {
    private static final HandlerList handlers = new HandlerList();
    /**
     * the player that connected
     */
    private Player player;
    /**
     * the client instance of the connected player
     */
    private SpigotConnection spigotConnection;

    public HandlerList getHandlers() {
        return handlers;
    }

    public static HandlerList getHandlerList() {
        return handlers;
    }

    /**
     * Creates a new {@code ClientConnectEvent} instance.
     *
     * @param player the player that connected
     * @param spigotConnection the client instance of the connected player
     */
    public ClientConnectEvent(final Player player, final SpigotConnection spigotConnection) {
        this.player = player;
        this.spigotConnection = spigotConnection;
    }

    /**
     * the player that connected
     */
    public Player getPlayer() {
        return this.player;
    }

    /**
     * the client instance of the connected player
     */
    public SpigotConnection getSpigotConnection() {
        return this.spigotConnection;
    }
}
