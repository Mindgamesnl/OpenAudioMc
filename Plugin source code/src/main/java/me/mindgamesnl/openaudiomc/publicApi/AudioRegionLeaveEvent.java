package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.event.Event;
import org.bukkit.entity.Player;
import org.bukkit.event.HandlerList;

public class AudioRegionLeaveEvent extends Event {
	private Player player;
	private String regionName;
	
	public AudioRegionLeaveEvent(String regionName, Player player) {
		this.player = player;
		this.regionName = regionName;
	}
	
	public Player getPlayer() {
		return player;
	}
	
	public String getRegion() {
		return regionName;
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
}
