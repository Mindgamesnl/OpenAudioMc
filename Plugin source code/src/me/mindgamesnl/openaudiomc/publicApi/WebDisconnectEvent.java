package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.event.Event;
import org.bukkit.entity.Player;
import org.bukkit.event.HandlerList;

public class WebDisconnectEvent extends Event {

	
	Player p;
	
	
	public WebDisconnectEvent(Player player) {
		this.p = player;
	}
	
	public Player getPlayer() {
		return p;
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
	
}