/*
 * 
 * // ""--.._
 * ||  (_)  _ "-._
 * ||    _ (_)    '-.
 * ||   (_)   __..-'
 * \\__..--""
 * 
 */

package net.openaudiomc.minecraft;

import java.io.File;
import java.io.IOException;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;

import net.openaudiomc.regions.regionCrap;
import net.openaudiomc.socket.Authenticator;

public class Main extends JavaPlugin implements Listener{
	

	public static Main pl;
	public static File MessagesFile;
	public static FileConfiguration MessagesConfig;
	public static String prefix;
	public static Main getPL(){
		return pl;
	}

	public static File fileLoc;
	

	
	//Start zooi 
	@Override
	public void onEnable(){
		pl = this;
		
		fileLoc = getDataFolder();
		
		getdDep.runCheck();
		
		createDataFile();
		createRegionsFile();
		createMessagesFile();
		createServerNode();
		createPlaylist();
		Bukkit.getServer().getPluginManager().registerEvents(new net.openaudiomc.socket.SocketListener(),this);
		Bukkit.getLogger().info("[OpenAudio] Loading OpenAudioMc by Mindgamesnl/Me_is_mattyh");
		try {
			net.openaudiomc.socket.Main.connect();
		} catch (Exception e) {
			// TODO Auto-generated catch bdatafileInstk
			e.printStackTrace();
		}
		
		prefix = ChatColor.translateAlternateColorCodes('&', "&9[&bOpenAudioMc&9] &3");
		
		//Audio commands
		this.getCommand("connect").setExecutor(new net.openaudiomc.commands.AudioCommands());
		this.getCommand("audio").setExecutor(new net.openaudiomc.commands.AudioCommands());
		this.getCommand("music").setExecutor(new net.openaudiomc.commands.AudioCommands());
		this.getCommand("sound").setExecutor(new net.openaudiomc.commands.AudioCommands());
		this.getCommand("muziek").setExecutor(new net.openaudiomc.commands.AudioCommands());
		this.getCommand("audioserver").setExecutor(new net.openaudiomc.commands.AudioCommands());
		this.getCommand("audioclient").setExecutor(new net.openaudiomc.commands.AudioCommands());
		//Volume command
		this.getCommand("volume").setExecutor(new net.openaudiomc.commands.volumeCommand());
		//Main command
		this.getCommand("openaudio").setExecutor(new net.openaudiomc.commands.AdminCommands());
		
		if (getdDep.getStatus()) {
			regionCrap.enable();
			Bukkit.getServer().getPluginManager().registerEvents(new net.openaudiomc.regions.regionCrap(),this);
		}

	}	
	

	
	//Sluit zooi
	@Override
	public void onDisable(){	
		
	}
		
	public void createMessagesFile() {

		MessagesFile = new File("plugins/OpenAudio", "messages.yml");
        if (!MessagesFile.exists()) {
            try {
            	MessagesFile.createNewFile();
            } catch (IOException e) {
                
            }
            MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
            MessagesConfig.set("Description", "This is the place to change the messges, host url and more :)");
            MessagesConfig.set("start-sound", "https://craftmend.com/api_SSL/openaudio/load_sound.mp3");
            MessagesConfig.set("website-url", "http://public.openaudiomc.net/?name=%name%&session=%session%");
            MessagesConfig.set("connect-message", "&9[&bOpenAudioMc&9] &3Click &ehere&3 to connect to our audio server!");
            MessagesConfig.set("connected-message", "&9[&bOpenAudioMc&9] &3You are now &aConnected&3 our audio server!");
            MessagesConfig.set("volume-set", "&9[&bVolume&9] &3Your volume has been set to &a%volume%&3%");
            MessagesConfig.set("volume-error", "&9[&bVolume&9] &4Invalid arguments.");
            
            try {
            	MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
		
	}
	
	public void createRegionsFile() {
		File regionsFile = new File("plugins/OpenAudio", "regions.yml");
		if (!regionsFile.exists()) {
			try {
				regionsFile.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			FileConfiguration regionsFileInst = YamlConfiguration.loadConfiguration(regionsFile);
			regionsFileInst.set("Description", "Info like region data will be stored here.");
			try {
				regionsFileInst.save(regionsFile);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public void createDataFile() {
		File dataFile = new File("plugins/OpenAudio", "serverData.yml");
        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {
                
            }
            FileConfiguration datafileInst = YamlConfiguration.loadConfiguration(dataFile);
            datafileInst.set("Description", "This is identifies the server and should be kept secret, do you have a bungeecord network? just set this id on all your server and bungeecord mode is activated :)");
            datafileInst.set("serverID", Authenticator.getNewId().getString("server"));
            datafileInst.set("clientID", Authenticator.getClientID());
            try {
                datafileInst.save(dataFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
	}
	
	public void createServerNode() {
		File dataFile = new File("plugins/OpenAudio/advanced", "advancedConfig.yml");
        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {
                
            }
            FileConfiguration datafileInst = YamlConfiguration.loadConfiguration(dataFile);
            datafileInst.set("Description", "Advanced settings (only for networking )");
            datafileInst.set("host", "https://craftmend.com/openaudio.json");
            datafileInst.set("Description-ssl", "WARNING!!! PHILIPS HUE WON'T WORK WHEN SSL IS ENABLED");
            datafileInst.set("ssl-enabled", "false");
            try {
                datafileInst.save(dataFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
	}
	
	public void createPlaylist() {
		File dataFile = new File("plugins/OpenAudio", "playlist.yml");
        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {
                
            }
            FileConfiguration datafileInst = YamlConfiguration.loadConfiguration(dataFile);
            datafileInst.set("Description", "Playlists are stored here");
            datafileInst.set("demo.1", "https://craftmend.com/api_SSL/openaudio/demo_playlist/1.mp3");
            datafileInst.set("demo.2", "https://craftmend.com/api_SSL/openaudio/demo_playlist/2.mp3");
            datafileInst.set("demo.3", "https://craftmend.com/api_SSL/openaudio/demo_playlist/3.mp3");
            try {
                datafileInst.save(dataFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
	}
	
	
	

	
	
	
}