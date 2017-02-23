package net.openaudiomc.files;


import java.io.File;

import org.bukkit.ChatColor;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

public class Messages {
	
	public static String getColor(String path) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "messages.yml"));
		String message_admin = cfg.getString(path);
		message_admin = ChatColor.translateAlternateColorCodes('&', message_admin);
		message_admin = ChatColor.translateAlternateColorCodes('$', message_admin);
		return message_admin;
	}

	public static String get(String path) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "messages.yml"));
		String message_admin = cfg.getString(path);
		return message_admin;
	}

}
