package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.event.Event;
import org.bukkit.entity.Player;
import org.bukkit.event.HandlerList;

public class SoundEndEvent extends Event {
	private Player player;
	private String id;
	
	public SoundEndEvent(Player player, String id) {
		this.player = player;
		this.id = id;
	}
	
	public Player getPlayer() {
		return player;
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
