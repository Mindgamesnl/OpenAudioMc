package net.openaudiomc.syncedsound.managers;

import java.util.*;

import com.google.common.collect.Maps;
import net.openaudiomc.utils.Callback;
import net.openaudiomc.utils.WebUtils;
import org.bukkit.Bukkit;

import net.openaudiomc.core.Main;
import net.openaudiomc.syncedsound.objects.SyncedSound;

public class SyncedSoundManager {
	
	private static Map<String, SyncedSound> syncedSoundMap = Maps.newHashMap();
	
	public static SyncedSound create(final String src, final String soundid, final String playername) {
		if (getBySrc(src) != null) {
			getBySrc(src).restart();
            return getBySrc(src);
		} else {
			System.out.println("[OpenAudio] Registerd new synced sound.");
			Callback<String> callback = new Callback<String>() {
			    public SyncedSound execute(String b) {
			    	char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
					StringBuilder sb = new StringBuilder();
					Random random = new Random();
					for (int i = 0; i < 20; i++) {
						char c = chars[random.nextInt(chars.length)];
						sb.append(c);
					}
					final String id = sb.toString();
					if (!Objects.equals(b, "00:00:00")) {
						syncedSoundMap.put(id, new SyncedSound(id, src, b, soundid));
						Bukkit.getScheduler().scheduleSyncDelayedTask(Main.getPL(), new Runnable() {
				            public void run() {
				            	UserManager.getPlayer(Bukkit.getPlayer(playername)).addSyncedSound(id);
								UserManager.getPlayer(Bukkit.getPlayer(playername)).syncSounds();
				            }
				        }, 2);
	                    return syncedSoundMap.get(id);
					}
					return null;
			    }
			};
			WebUtils.asyncHttpRequest("http://api.openaudiomc.net/plugin/mp3_info.php?s=" + src, callback);
		}
        return null;
    }
	
	public static void remove(String id) {
		syncedSoundMap.remove(id);
	}
	
	public static SyncedSound getById(String id) {
		return syncedSoundMap.get(id);
	}

	private static SyncedSound getBySrc(String src) {
		for (String key: syncedSoundMap.keySet()) {
			if (Objects.equals(syncedSoundMap.get(key).getSrc(), src)) {
				return syncedSoundMap.get(key);
			}
		}
		return null;
	}
	
	public static SyncedSound getBySoundId(String id) {
		for (String key: syncedSoundMap.keySet()) {
			if (Objects.equals(syncedSoundMap.get(key).getSoundId(), id)) {
				return syncedSoundMap.get(key);
			}
		}
		return null;
	}
	
	public static List<SyncedSound> listSyncedSounds() {
		return new ArrayList<>(syncedSoundMap.values());
	}
}
