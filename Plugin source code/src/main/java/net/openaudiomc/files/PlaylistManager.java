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
package net.openaudiomc.files;

import java.io.File;
import java.io.IOException;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.json.simple.JSONArray;

public class PlaylistManager {

	public static void set(String name, String id, String src) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "playlist.yml"));
        cfg.set(name+"."+id, src);
        try {
			cfg.save(new File("plugins/OpenAudio", "playlist.yml"));
		} catch (IOException e) {
			e.printStackTrace();
		}
        
	}

	public static JSONArray getAll(String id) {
		boolean loaded = false;
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "playlist.yml"));
		JSONArray list = new JSONArray();
		for(String key : cfg.getConfigurationSection(id).getKeys(false)){
			loaded = true;
			list.add(cfg.get(id+"."+key));
		}
		if (loaded) {
			return list;
		}
		return null;
	}
}