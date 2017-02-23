package net.openaudiomc.internal.events;

import org.bukkit.event.Event;
import org.bukkit.event.HandlerList;

public class SocketCommandEvent extends Event {

	Object command;
	
	public SocketCommandEvent(Object args) {
		this.command = args;
	}
	
	public Object getCommand() {
		return this.command;
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
	
}
