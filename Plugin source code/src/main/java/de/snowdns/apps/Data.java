package de.snowdns.apps;

import java.io.File;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

public class Data {

	
	public static String getSCode() {
		FileConfiguration cfg =
                YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "snowd.yml"));
        return cfg.getString("SCode");
		
	}
	public static String getRID() {
		FileConfiguration cfg =
                YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "snowd.yml"));
        return cfg.getString("RID");
		
	}
	public static String getNID() {
		FileConfiguration cfg =
                YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "snowd.yml"));
        return cfg.getString("NID");
		
	}
}
