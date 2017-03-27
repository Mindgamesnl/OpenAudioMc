package net.openaudiomc.files;

import java.io.File;
import java.io.IOException;
import java.util.Random;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

import net.openaudiomc.actions.command;

public class modManager {
	
	public static void addCss(String url) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio/advanced", "mods.yml"));
		File regionsFile = new File("plugins/OpenAudio/advanced", "mods.yml");
		Random rand = new Random();
		int  n = rand.nextInt(50) + 1;
		cfg.set("css."+n, url);
		try {
			cfg.save(regionsFile);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void addJs(String url) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio/advanced", "mods.yml"));
		File regionsFile = new File("plugins/OpenAudio/advanced", "mods.yml");
		Random rand = new Random();
		int  n = rand.nextInt(50) + 1;
		cfg.set("js."+n, url);
		try {
			cfg.save(regionsFile);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void loadMods(String p) {
		FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio/advanced", "mods.yml"));
		try {
			for(String key : cfg.getConfigurationSection("css").getKeys(false)){
				command.addCss(p, cfg.getString("css."+key));
			}
			for(String key : cfg.getConfigurationSection("js").getKeys(false)){
				command.addJs(p, cfg.getString("js."+key));
			}
		} catch(Exception e) {}
	}
	
	public static void setBg(String url) {
		File MessagesFile = new File("plugins/OpenAudio", "messages.yml");
		YamlConfiguration MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
    	MessagesConfig.set("background-image", url);
    	try {
			MessagesConfig.save(MessagesFile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
