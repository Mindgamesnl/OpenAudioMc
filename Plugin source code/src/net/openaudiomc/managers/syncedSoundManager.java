package net.openaudiomc.managers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import org.bukkit.Bukkit;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.objects.syncedSound;
import net.openaudiomc.utils.webUtils;
import net.openaudiomc.utils.callback.Callback;

public class syncedSoundManager {
	
	static HashMap<String, syncedSound> syncedSoundMap = new HashMap<String, syncedSound>();
	
	public static syncedSound create(final String src, final String soundid, final String playername) {
		if (getBySrc(src) != null) {
			getBySrc(src).restart();
            return getBySrc(src);
		} else {
			System.out.println("[OpenAudio] Registerd new synced sound.");
			Callback<String> callback = new Callback<String>() {
			    public syncedSound execute(String b) {
			    	char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
					StringBuilder sb = new StringBuilder();
					Random random = new Random();
					for (int i = 0; i < 20; i++) {
						char c = chars[random.nextInt(chars.length)];
						sb.append(c);
					}
					final String id = sb.toString();
			    	String time = b;
			    	if (time != "00:00:00") {
						syncedSoundMap.put(id, new syncedSound(id, src, time, soundid));
						Bukkit.getScheduler().scheduleSyncDelayedTask(Main.getPL(), new Runnable() {
				            public void run() {
				            	userManager.getPlayer(Bukkit.getPlayer(playername)).addSyncedSound(id);
			                    userManager.getPlayer(Bukkit.getPlayer(playername)).syncSounds();
				            }
				        }, 2);
	                    return syncedSoundMap.get(id);
					}
					return null;
			    }
			};
			webUtils.asyncHttpRequest("http://api.openaudiomc.net/plugin/mp3_info.php?s=" + src, callback);
		}
        return null;
    }
	
	public static void remove(String id) {
		syncedSoundMap.remove(id);
	}
	
	public static syncedSound getById(String id) {
		return syncedSoundMap.get(id);
	}

	public static syncedSound getBySrc(String src) {
		for (String key: syncedSoundMap.keySet()) {
			if (syncedSoundMap.get(key).getSrc() == src) {
				return syncedSoundMap.get(key);
			}
		}
		return null;
	}
	
	public static syncedSound getBySoundId(String id) {
		for (String key: syncedSoundMap.keySet()) {
			if (syncedSoundMap.get(key).getSoundId() == id) {
				return syncedSoundMap.get(key);
			}
		}
		return null;
	}
	
	public static List<syncedSound> listSyncedSounds() {
		List<syncedSound> list = new ArrayList<syncedSound>(syncedSoundMap.values());
		return list;
	}
}
