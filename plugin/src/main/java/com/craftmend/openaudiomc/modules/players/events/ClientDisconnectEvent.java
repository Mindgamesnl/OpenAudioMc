package com.craftmend.openaudiomc.modules.players.events;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.bukkit.entity.Player;
import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

@AllArgsConstructor
public class ClientDisconnectEvent extends Event {

    private static final HandlerList handlers = new HandlerList();

    /**
     * the player that disconnected
     */
    @Getter private Player player;

    public HandlerList getHandlers() {
        return handlers;
    }

    public static HandlerList getHandlerList() {
        return handlers;
    }
}
