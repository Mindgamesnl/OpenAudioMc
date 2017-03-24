package net.openaudiomc.internal.events;

import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class SocketWhisperEvent extends Event {

	String p;
	String data;
	
	public SocketWhisperEvent(String string, String eventData) {
		this.p = string;
		this.data = eventData;
	}
	
	public String getPlayerName() {
		return p;
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
