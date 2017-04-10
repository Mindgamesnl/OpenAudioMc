package net.openaudiomc.managers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.openaudiomc.objects.syncedSound;
import net.openaudiomc.utils.webUtils;

public class syncedSoundManager {
	
	static HashMap<String, syncedSound> syncedSoundMap = new HashMap<String, syncedSound>();
	
	public static void create(String id, String src) {
		try {
			String time = webUtils.textFromUrl("http://api.openaudiomc.net/plugin/mp3_info.php?s="+src);
			if (time != "00:00:00") {
				syncedSoundMap.put(id, new syncedSound(id, src, time));
			}
		} catch (IOException e) {
			//error while contacting api server
			e.printStackTrace();
		}
	}
	
	public static void remove(String id) {
		syncedSoundMap.remove(id);
	}
	
	public static syncedSound getById(String id) {
		return syncedSoundMap.get(id);
	}
	
	public static List<syncedSound> listSyncedSounds() {
		List<syncedSound> list = new ArrayList<syncedSound>(syncedSoundMap.values());
		return list;
	}
}
