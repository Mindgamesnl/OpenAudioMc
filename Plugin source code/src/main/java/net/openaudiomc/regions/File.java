package net.openaudiomc.regions;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

public class File {

	public static String getString(String path) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new java.io.File("plugins/OpenAudio", "regions.yml"));
		return cfg.getString(path);
	}
	
	public static String getStringMes(String path) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new java.io.File("plugins/OpenAudio", "messages.yml"));
		return cfg.getString(path);
	}
	
	public static String getStringMod(String path) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new java.io.File("plugins/OpenAudio/advanced", "mods.yml"));
		return cfg.getString(path);
	}
}