package me.mindgamesnl.openaudiomc.config;

import java.io.File;

import org.bukkit.Bukkit;
import org.bukkit.plugin.Plugin;

public class configManager {
	
	
	private static Plugin PL;
	

	public static void Setup() {
		setPL(me.mindgamesnl.openaudiomc.main.Main.getPL());
	}
	
	
	public static void Manager() {
		
		File configFile = new File(PL.getDataFolder(), "config.yml");
		
		 if (configFile.exists()) {
			 
			 Bukkit.broadcastMessage("[OpenAudio] Config found!");
			 
			 if (PL.getConfig().getString("config.startsound") == null) {
				 Bukkit.broadcastMessage("[OpenAudio] Old config file found! installing update...");
				 PL.getConfig().set("config.startsound", "http://static.craftmend.com/spigot/openaudio/load_sound.mp3");
				 PL.getConfig().options().copyDefaults(true);
				 PL.saveConfig();
			 }
			 
			 
			 if (PL.getConfig().getString("config.enableSessions") == null) {
				 Bukkit.broadcastMessage("[OpenAudio] Old config file found! installing update...");
				 PL.getConfig().set("config.enableSessions", true);
				 PL.getConfig().options().copyDefaults(true);
				 PL.saveConfig();
			 }
			 
			 
			 if (PL.getConfig().getString("config.ws_host_adress") == null) {
				 Bukkit.broadcastMessage("[OpenAudio] Old config file found! installing update...");
			   		try {
						PL.getConfig().set("config.ws_host_adress", me.mindgamesnl.openaudiomc.apiConnector.ApiFunctions.getWsAdress());
					} catch (Exception e) {
						e.printStackTrace();
					}
				 PL.getConfig().options().copyDefaults(true);
				 PL.saveConfig();
			 }
			 
		 } else {
			 Bukkit.getLogger().info("[OpenAudio] Wecome new user! this is OpenAudioMc (Duhh). If you have any problems, just let me know ;)");
			 Bukkit.broadcastMessage("[OpenAudio] No config found! lets make one shall we?");
			 try {
				me.mindgamesnl.openaudiomc.config.Creator.SetupDefault();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 Bukkit.broadcastMessage("[OpenAudio] Created config file! setting up server...");
		 }
	}


	public static Plugin getPL() {
		return PL;
	}


	public static void setPL(Plugin pL) {
		PL = pL;
	}
}