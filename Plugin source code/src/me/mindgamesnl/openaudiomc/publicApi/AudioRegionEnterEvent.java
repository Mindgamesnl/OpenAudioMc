package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.event.Event;
import org.bukkit.entity.Player;
import org.bukkit.event.HandlerList;

public class AudioRegionEnterEvent extends Event {

	
	Player p;
	String Sound;
	String region_name;
	
	
	public AudioRegionEnterEvent(String region_name, Player player, String src) {
		this.p = player;
		this.Sound = src;
		this.region_name = region_name;
	}
	
	public Player getPlayer() {
		return p;
	}
	
	public String getRegion() {
		return region_name;
	}
	
	public String getSound() {
		return Sound;
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
	
}
