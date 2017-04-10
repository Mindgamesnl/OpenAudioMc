package net.openaudiomc.objects;

import java.util.ArrayList;

import org.bukkit.entity.Player;

import net.openaudiomc.managers.syncedSoundManager;

public class userData {

	Player player;
	String name;
	ArrayList<String> syncedSouncs = new ArrayList<>();;
	
	
	public userData(Player p) {
		this.player = p;
		this.name = p.getName();
	}
	
	//functions
	public void syncSounds() {
		for (String id : getSyncedSounds()) {
			syncedSound target = syncedSoundManager.getById(id);
			Integer miliSeconds = target.getTimeInMs();
			String src = target.getSrc();
			//play
		}
	}
	
	//getters and setters
	public Player getPlayer() {
		return this.player;
	}
	
	public String getName() {
		return this.name;
	}
	
	public ArrayList<String> getSyncedSounds() {
		return this.syncedSouncs;
	}
	
	public void addSyncedSound(String id) {
		this.syncedSouncs.add(id);
	}
	
	public void removeSyncedSound(String id) {
		this.syncedSouncs.remove(id);
	}
	
	
}
