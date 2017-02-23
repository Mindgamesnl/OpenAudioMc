package net.openaudiomc.internal.events;

import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class SocketConnectEvent extends Event {
	
	public SocketConnectEvent() {
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
	
}
