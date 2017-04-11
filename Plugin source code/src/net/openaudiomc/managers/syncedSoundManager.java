package net.openaudiomc.managers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import net.openaudiomc.objects.syncedSound;
import net.openaudiomc.utils.webUtils;

public class syncedSoundManager {
	
	static HashMap<String, syncedSound> syncedSoundMap = new HashMap<String, syncedSound>();
	
	public static syncedSound create(String src, String soundid) {
		if (getBySrc(src) != null) {
			getBySrc(src).restart();
            return getBySrc(src);
		} else {
			System.out.println("[OpenAudio] Registerd new synced sound.");
			try {
				char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
				StringBuilder sb = new StringBuilder();
				Random random = new Random();
				for (int i = 0; i < 20; i++) {
					char c = chars[random.nextInt(chars.length)];
					sb.append(c);
				}
				String id = sb.toString();

				String time = webUtils.textFromUrl("http://api.openaudiomc.net/plugin/mp3_info.php?s=" + src);
				if (time != "00:00:00") {
					syncedSoundMap.put(id, new syncedSound(id, src, time, soundid));
                    return syncedSoundMap.get(id);
				}
			} catch (IOException e) {
				//error while contacting api server
				e.printStackTrace();
			}
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
