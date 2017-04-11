package net.openaudiomc.objects;

import java.util.ArrayList;
import java.util.Random;

import net.openaudiomc.actions.command;
import org.bukkit.entity.Player;

import net.openaudiomc.managers.syncedSoundManager;

public class userData {

	Player player;
	String name;
	ArrayList<String> syncedSouncs = new ArrayList<>();
	

	public userData(Player p) {
		this.player = p;
		this.name = p.getName();
	}

	//functions

	public void stopSounds() {
		for (String id : getSyncedSounds()) {
            syncedSoundManager.remove(syncedSoundManager.getById(id).getId());
		}
	}

	public void syncSounds() {
		for (String id : getSyncedSounds()) {
			syncedSound target = syncedSoundManager.getById(id);
			Integer miliSeconds = target.getTimeInMs();
			String src = target.getSrc();
			//play
			if (target.isPlaying()) {
				command.playFromTime(this.player.getName(), target.getSoundId(), src, miliSeconds);
			} else {
				syncedSoundManager.remove(target.getId());
			}
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
