package me.mindgamesnl.openaudiomc.publicApi;

import org.bukkit.event.Event;
import org.bukkit.entity.Player;
import org.bukkit.event.HandlerList;

public class AudioRegionEnterEvent extends Event {

	private Player player;
	private String sound;
	private String regionName;
	
	public AudioRegionEnterEvent(String regionName, Player player, String src) {
		this.player = player;
		this.sound = src;
		this.regionName = regionName;
	}
	
	public Player getPlayer() {
		return player;
	}
	
	public String getRegion() {
		return regionName;
	}
	
	public String getSound() {
		return sound;
	}
	
	private static final HandlerList handlers = new HandlerList();

	public HandlerList getHandlers() {
	    return handlers;
	}

	public static HandlerList getHandlerList() {
	    return handlers;
	}
}
