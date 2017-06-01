package net.openaudiomc.syncedsound.objects;

import java.util.ArrayList;
import java.util.ConcurrentModificationException;

import net.openaudiomc.actions.Command;
import net.openaudiomc.syncedsound.managers.SyncedSoundManager;
import org.bukkit.entity.Player;

public class UserData {

	private Player player;
	private String name;
	private ArrayList<String> syncedSouncs = new ArrayList<>();
	
	public UserData(Player p) {
		this.player = p;
		this.name = p.getName();
	}

	public void stopSounds() {
		for (String id : getSyncedSounds()) {
            SyncedSoundManager.remove(SyncedSoundManager.getById(id).getId());
		}
	}

	public void syncSounds() {
		for (String id : getSyncedSounds()) {
            SyncedSound target = SyncedSoundManager.getById(id);

            	Integer miliSeconds = target.getTimeInMs();
    			String src = target.getSrc();
    			if (target.isPlaying()) {
    				Command.playFromTime(this.player.getName(), SyncedSoundManager.getById(id).getSoundId(), src, miliSeconds);
    			} else {
					SyncedSoundManager.remove(target.getId());
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
		try {
			for (String sound : getSyncedSounds()) {
				if (!syncedSouncs.isEmpty()) {
					syncedSouncs.remove(sound);
				}
			}
		} catch (ConcurrentModificationException e) {}
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