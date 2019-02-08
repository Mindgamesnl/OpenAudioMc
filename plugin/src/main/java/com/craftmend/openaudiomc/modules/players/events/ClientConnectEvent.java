package com.craftmend.openaudiomc.modules.players.events;

import com.craftmend.openaudiomc.modules.players.interfaces.ClientConnection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.bukkit.entity.Player;
import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

@AllArgsConstructor
public class ClientConnectEvent extends Event {

    private static final HandlerList handlers = new HandlerList();

    /**
     * the player that connected
     */
    @Getter private Player player;

    /**
     * the client instance of the connected player
     */
    @Getter private ClientConnection client;

    public HandlerList getHandlers() {
        return handlers;
    }

    public static HandlerList getHandlerList() {
        return handlers;
    }
}
