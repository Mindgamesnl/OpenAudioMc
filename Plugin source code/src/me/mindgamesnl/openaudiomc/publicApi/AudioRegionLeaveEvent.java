package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.event.Event;
import org.bukkit.entity.Player;
import org.bukkit.event.HandlerList;

public class AudioRegionLeaveEvent extends Event {

	private Player player;
	private String region_name;
	
	public AudioRegionLeaveEvent(String region_name, Player player) {
		this.player = player;
		this.region_name = region_name;
	}
	
	public Player getPlayer() {
		return player;
	}
	
	public String getRegion() {
		return region_name;
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
}
