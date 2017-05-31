import java.io.File;

import org.bukkit.ChatColor;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

public class dataGetter {
	
	public static String get(String path) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio/advanced", "advancedConfig.yml"););
		String message_admin = cfg.getString(path);
		return message_admin;
	}

}
