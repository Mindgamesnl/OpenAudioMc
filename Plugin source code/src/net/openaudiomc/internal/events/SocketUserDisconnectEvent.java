package net.openaudiomc.internal.events;

import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class SocketUserDisconnectEvent extends Event {

	Object name;
	
	public SocketUserDisconnectEvent(Object args) {
		this.name = args;
	}
	
	public String getName() {
		return name.toString();
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
	
}
