package net.openaudiomc.regions;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

public class File {

	public static String getString(String path) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new java.io.File("plugins/OpenAudio", "regions.yml"));
		return cfg.getString(path);
	}
}