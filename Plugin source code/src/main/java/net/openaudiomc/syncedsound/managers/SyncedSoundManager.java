/*
 * Copyright (C) 2017 Mindgamesnl
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package net.openaudiomc.syncedsound.managers;

import com.google.common.collect.Lists;
import java.util.*;

import com.google.common.collect.Maps;
import lombok.Getter;
import net.openaudiomc.utils.Callback;
import net.openaudiomc.utils.WebUtils;
import org.bukkit.Bukkit;

import net.openaudiomc.core.Main;
import net.openaudiomc.syncedsound.objects.SyncedSound;

public class SyncedSoundManager {
	@Getter private static Map<String, SyncedSound> syncedSoundMap = Maps.newHashMap();
	
	public static SyncedSound create(final String src, final String soundid, final String playername) {
		if (getBySrc(src) != null) {
			getBySrc(src).restart();
            return getBySrc(src);
		} else {
			System.out.println("[OpenAudio] Registerd new synced sound.");
			Callback<String> callback = string -> {
        char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
      StringBuilder sb = new StringBuilder();
      Random random = new Random();
      for (int i = 0; i < 20; i++) {
        char c = chars[random.nextInt(chars.length)];
        sb.append(c);
      }
      final String id = sb.toString();
      if (!Objects.equals(string, "00:00:00")) {
        getSyncedSoundMap().put(id, new SyncedSound(id, src, string, soundid));
        Bukkit.getScheduler().scheduleSyncDelayedTask(Main.get(), () -> {
          UserManager.getPlayer(Bukkit.getPlayer(playername)).addSyncedSound(id);
    UserManager.getPlayer(Bukkit.getPlayer(playername)).syncSounds();
        }, 2);
                  return getSyncedSoundMap().get(id);
      }
      return null;
      };
			WebUtils.asyncHttpRequest("http://api.openaudiomc.net/plugin/mp3_info.php?s=" + src, callback);
		}
        return null;
    }
	
	public static void remove(String id) {
		getSyncedSoundMap().remove(id);
	}
	
	public static SyncedSound getById(String id) {
		return getSyncedSoundMap().get(id);
	}

	private static SyncedSound getBySrc(String src) {
		for (String key: getSyncedSoundMap().keySet()) {
			if (Objects.equals(getSyncedSoundMap().get(key).getSource(), src)) {
				return getSyncedSoundMap().get(key);
			}
		}
		return null;
	}
	
	public static SyncedSound getBySoundId(String id) {
		for (String key: getSyncedSoundMap().keySet()) {
			if (Objects.equals(getSyncedSoundMap().get(key).getSoundId(), id)) {
				return getSyncedSoundMap().get(key);
			}
		}
		return null;
	}
	
	public static List<SyncedSound> listSyncedSounds() {
		return Lists.newArrayList(getSyncedSoundMap().values());
	}
}