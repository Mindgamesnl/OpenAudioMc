package com.craftmend.openaudiomc.spigot.modules.players.events;

import org.bukkit.entity.Player;
import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class ClientDisconnectEvent extends Event {
    private static final HandlerList handlers = new HandlerList();
    /**
     * the player that disconnected
     */
    private Player player;

    public HandlerList getHandlers() {
        return handlers;
    }

    public static HandlerList getHandlerList() {
        return handlers;
    }

    /**
     * Creates a new {@code ClientDisconnectEvent} instance.
     *
     * @param player the player that disconnected
     */
    public ClientDisconnectEvent(final Player player) {
        this.player = player;
    }

    /**
     * the player that disconnected
     */
    public Player getPlayer() {
        return this.player;
    }
}
