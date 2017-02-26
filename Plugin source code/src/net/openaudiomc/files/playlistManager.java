package net.openaudiomc.files;

import java.io.File;
import java.io.IOException;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.json.simple.JSONArray;

public class playlistManager {

	public static void set(String name, String id, String src) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "playlist.yml"));
        cfg.set(name+"."+id, src);
        try {
			cfg.save(new File("plugins/OpenAudio", "playlist.yml"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
	}
	
	@SuppressWarnings("unchecked")
	public static JSONArray getAllFilesInOneBigBulcCuzThatIsPrettyAwesome(String id) {
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
		return list;

		
	}
	
}
