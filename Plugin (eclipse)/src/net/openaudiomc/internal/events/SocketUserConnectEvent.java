package net.openaudiomc.internal.events;

import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class SocketUserConnectEvent extends Event {

	String name;
	String key;
	
	public SocketUserConnectEvent(String name2, String key2) {
		this.name = name2;
		this.key = key2;
	}
	
	public String getName() {
		return name;
	}
	
	public String getKey() {
		return key;
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
	
}
