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
import org.bukkit.Location;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;

import ch.njol.skript.Skript;
import net.openaudiomc.regions.regionCrap;
import net.openaudiomc.socket.Authenticator;
import net.openaudiomc.socket.timeoutManager;
import net.openaudiomc.utils.webUtils;
import net.openaudiomc.commands.AdminCommands;
import net.openaudiomc.commands.AudioCommands;
import net.openaudiomc.commands.volumeCommand;
import net.openaudiomc.files.Messages;
import net.openaudiomc.files.modManager;
import net.openaudiomc.internal.events.SkriptRegistration;
import net.openaudiomc.managers.audioSpeakerManager;
import net.openaudiomc.objects.audioSpeaker;

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
		createModsFile();
		Bukkit.getServer().getPluginManager().registerEvents(new timeoutManager(), this);
		Bukkit.getServer().getPluginManager().registerEvents(new eventListener(), this);
		Bukkit.getLogger().info("[OpenAudio] Loading OpenAudioMc by Mindgamesnl/Me_is_mattyh");
		try {
			net.openaudiomc.socket.SocketioConnector.connect();
		} catch (Exception e) {
			Bukkit.getLogger().info("[OpenAudio] Failed to connect to the socket.io server, openaudio will not work correctly.");
		}
		
		prefix = ChatColor.translateAlternateColorCodes('&', "&9[&bOpenAudioMc&9] &3");
		
		//Audio commands
		this.getCommand("connect").setExecutor(new AudioCommands());
		this.getCommand("audio").setExecutor(new AudioCommands());
		this.getCommand("music").setExecutor(new AudioCommands());
		this.getCommand("sound").setExecutor(new AudioCommands());
		this.getCommand("muziek").setExecutor(new AudioCommands());
		this.getCommand("audioserver").setExecutor(new AudioCommands());
		this.getCommand("audioclient").setExecutor(new AudioCommands());
		//Volume command
		this.getCommand("volume").setExecutor(new volumeCommand());
		//Main command
		this.getCommand("openaudio").setExecutor(new AdminCommands());
		this.getCommand("oa").setExecutor(new AdminCommands());
		this.getCommand("oam").setExecutor(new AdminCommands());
		
		modManager.setBg("Moved to https://plus.openaudiomc.net");
		
		if (getdDep.getStatus()) {
			regionCrap.enable();
			Bukkit.getServer().getPluginManager().registerEvents(new net.openaudiomc.regions.regionCrap(),this);
		}
		
		if (getdDep.skriptInstalled) {
			Skript.registerAddon(this);
			SkriptRegistration.load();
			Bukkit.getLogger().info("[OpenAudio] Whoah! just like that! loaded the skript events :D");
		} else {
			Bukkit.getLogger().info("[OpenAudio] Skript was not found in your server, gues we're not loading the sk-events then.");
		}
		audioSpeakerManager.createSound("testskullsound", "http://test.craftmendserver.com/2.mp3");
		audioSpeakerManager.createSpeaker("testskullspeaker", "testskullsound", new Location(Bukkit.getWorld("test"), 92, 53, 190));
		audioSpeakerManager.Init();

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
            MessagesConfig.set("disconnect-message", "&9[&bOpenAudioMc&9] &3You are now &4Disconnected&3 from our audio server!");
            MessagesConfig.set("connected-message", "&9[&bOpenAudioMc&9] &3You are now &aConnected&3 to our audio server!");
            MessagesConfig.set("hue-connected-message", "&9[&bOpenAudioMc&9] &3You are now &aConnected&3 with your philips &dh&bu&ae&3!");
            MessagesConfig.set("volume-set", "&9[&bVolume&9] &3Your volume has been set to &a%volume%&3%");
            MessagesConfig.set("volume-error", "&9[&bVolume&9] &4Invalid arguments.");
            
            try {
            	MessagesConfig.save(MessagesFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        if (Messages.get("disconnect-message") == null) {
        	MessagesFile = new File("plugins/OpenAudio", "messages.yml");
        	MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
        	MessagesConfig.set("disconnect-message", "&9[&bOpenAudioMc&9] &3You are now &4Disconnected&3 from our audio server!");
        	try {
				MessagesConfig.save(MessagesFile);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        
        if (Messages.get("background-image") == null) {
        	MessagesFile = new File("plugins/OpenAudio", "messages.yml");
        	MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
        	MessagesConfig.set("background-image", "<none>");
        	try {
				MessagesConfig.save(MessagesFile);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        
        if (Messages.get("stop-on-teleport") == null) {
        	MessagesFile = new File("plugins/OpenAudio", "messages.yml");
        	MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
        	MessagesConfig.set("stop-on-teleport", false);
        	try {
				MessagesConfig.save(MessagesFile);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        
        if (Messages.get("hue-connected-message") == null) {
        	MessagesFile = new File("plugins/OpenAudio", "messages.yml");
        	MessagesConfig = YamlConfiguration.loadConfiguration(MessagesFile);
        	MessagesConfig.set("hue-connected-message", "&9[&bOpenAudioMc&9] &3You are now &aConnected&3 with your philips &dh&bu&ae&3!");
        	try {
				MessagesConfig.save(MessagesFile);
			} catch (IOException e) {
				// TODO Auto-generated catch block
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
	
	public void createModsFile() {
		File regionsFile = new File("plugins/OpenAudio/advanced", "mods.yml");
		if (!regionsFile.exists()) {
			try {
				regionsFile.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			FileConfiguration regionsFileInst = YamlConfiguration.loadConfiguration(regionsFile);
			regionsFileInst.set("Description", "(ONLY FOR USERS WHO DON'T HAVE OWN HOSTING) urls to css/js files will be stored here :3");
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
	
	public void disableSslConfig() {
		File dataFile = new File("plugins/OpenAudio/advanced", "advancedConfig.yml");
        if (!dataFile.exists()) {
            try {
                dataFile.createNewFile();
            } catch (IOException e) {
                
            }
            FileConfiguration datafileInst = YamlConfiguration.loadConfiguration(dataFile);
            datafileInst.set("Description", "Advanced settings (only for networking )");
            datafileInst.set("host", "https://craftmend.com/openaudio.json");
            datafileInst.set("Description-ssl", "Dear user, ssl settings + hue settings have been moved to https://plus.openaudimc.net/");
            datafileInst.set("ssl-enabled", "deprecated");
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