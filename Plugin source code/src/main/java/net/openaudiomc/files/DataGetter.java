package net.openaudiomc.files;

import java.io.File;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

public class DataGetter {

	public static String get(String path) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio/advanced", "advancedConfig.yml"));
		return cfg.getString(path);
	}

}