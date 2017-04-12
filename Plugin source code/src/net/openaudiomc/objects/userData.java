package net.openaudiomc.objects;

import java.util.ArrayList;

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
			if (target.isPlaying()) {
				command.playFromTime(this.player.getName(), syncedSoundManager.getById(id).getSoundId(), src, miliSeconds);
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
	
	public void removeAllSyncedSounds() {
		for (String sound : getSyncedSounds()) {
			if (!syncedSouncs.isEmpty()) {
				syncedSouncs.remove(sound);
			}
		}
	}

	public ArrayList<String> getSyncedSounds() {
		return this.syncedSouncs;
	}

	public String getSoundId() {
        return this.getSoundId();
    }

	public void addSyncedSound(String id) {
		this.syncedSouncs.add(id);
	}

	public void removeSyncedSound(String id) {
		if (!syncedSouncs.isEmpty()) {
			this.syncedSouncs.remove(id);
		}
	} 

}
