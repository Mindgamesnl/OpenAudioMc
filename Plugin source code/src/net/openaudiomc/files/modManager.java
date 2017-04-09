package net.openaudiomc.files;

import java.io.File;
import java.io.IOException;

import org.bukkit.configuration.file.YamlConfiguration;


public class modManager {
	
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
