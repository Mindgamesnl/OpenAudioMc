package net.openaudiomc.internal.events;

import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class SocketWhisperEvent extends Event {

	private String playerName;
	private String data;
	
	public SocketWhisperEvent(String playerName, String data) {
		this.playerName = playerName;
		this.data = data;
	}
	
	public String getPlayerName() {
		return playerName;
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