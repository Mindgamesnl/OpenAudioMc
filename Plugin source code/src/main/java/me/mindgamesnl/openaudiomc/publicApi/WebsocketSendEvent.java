package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.event.Event;
import org.bukkit.entity.Player;
import org.bukkit.event.HandlerList;

public class WebsocketSendEvent extends Event {

	private Player player;
	private String data;
	
	public WebsocketSendEvent(Player player, String data) {
		this.player = player;
		this.data = data;
	}
	
	public Player getPlayer() {
		return player;
	}
	
	public String getData() {
		return data;
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
}