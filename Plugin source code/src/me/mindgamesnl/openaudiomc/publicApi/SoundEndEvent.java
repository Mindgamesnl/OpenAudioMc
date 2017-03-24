package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.event.Event;
import org.bukkit.entity.Player;
import org.bukkit.event.HandlerList;

public class SoundEndEvent extends Event {

	Player p;
	String id;
	
	public SoundEndEvent(Player player, String id) {
		this.p = player;
		this.id = id;
	}
	
	public Player getPlayer() {
		return p;
	}
	
	public String getId() {
		return id;
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
	
}
