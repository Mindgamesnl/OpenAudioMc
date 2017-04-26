package net.openaudiomc.speakerSystem;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Skull;
import org.bukkit.configuration.InvalidConfigurationException;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.speakerSystem.managers.audioSpeakerManager;
import net.openaudiomc.speakerSystem.objects.audioSpeaker;

/**
 * Created by mats on 23-4-2017.
 */
public class speakerMain {
	
	public static HashMap<Player, String> placer = new HashMap<Player, String>();
	
	public static void giveSpeaker(Player p, String file) {
		placer.put(p, file);
          ItemStack skull = new ItemStack(Material.SKULL_ITEM);
          skull.setDurability((short)3);
          SkullMeta sm = (SkullMeta) skull.getItemMeta();
          sm.setOwner("OpenAudioMc");
          sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
          skull.setItemMeta(sm);

          p.getInventory().addItem(skull);
	}
	
	public static void saveSound(String src) {
		File savedFile = new File("plugins/OpenAudio/speakers/sounds", src.replaceAll("/", "_slash_")+".yml");
		if (!savedFile.exists()) {
			try {
				savedFile.createNewFile();
			} catch (IOException e) {
			}
			FileConfiguration regionsFileInst = YamlConfiguration.loadConfiguration(savedFile);
			regionsFileInst.set("src", src);
			try {
				regionsFileInst.save(savedFile);
			} catch (IOException e) {
			}
		}
	}
	
	public static void loadSounds() {
		YamlConfiguration config = new YamlConfiguration();
		File[] files = new File("plugins/OpenAudio/speakers/sounds").listFiles();
		for(File file : files){
		    try {
	    		config.load(file);
	    		audioSpeakerManager.createSound(config.getString("src")+"_sound", config.getString("src"));
		    } catch (FileNotFoundException e) {
		        e.printStackTrace();
		    } catch (IOException e) {
		        e.printStackTrace();
		    } catch (InvalidConfigurationException e) {
		        e.printStackTrace();
		    }
		}
	}
	
	public static void loadSpeaker() {
		YamlConfiguration config = new YamlConfiguration();
		File[] files = new File("plugins/OpenAudio/speakers/speakers").listFiles();
		for(File file : files){
		    try {
	    		config.load(file);
	    		
	    		audioSpeakerManager.createSpeaker(config.getString("src")+"_speaker", config.getString("src")+"_sound", new Location(Bukkit.getWorld(config.getString("world")), config.getLong("x"),config.getLong("y"),config.getLong("z")));
	    		
	    		audioSpeakerManager.createSound(config.getString("src")+"_sound", config.getString("src"));
		    } catch (FileNotFoundException e) {
		        e.printStackTrace();
		    } catch (IOException e) {
		        e.printStackTrace();
		    } catch (InvalidConfigurationException e) {
		        e.printStackTrace();
		    }
		}
	}
	
	public static void saveSpeaker(String src, String g, double X, double Y, double Z) {
		File savedFile = new File("plugins/OpenAudio/speakers/speakers", X+"-"+Y+"-"+Z+".yml");
		if (!savedFile.exists()) {
			try {
				savedFile.createNewFile();
			} catch (IOException e) {
			}
			FileConfiguration regionsFileInst = YamlConfiguration.loadConfiguration(savedFile);
			regionsFileInst.set("src", src);
			regionsFileInst.set("x", X);
			regionsFileInst.set("y", Y);
			regionsFileInst.set("z", Z);
			regionsFileInst.set("world", g);
			try {
				regionsFileInst.save(savedFile);
			} catch (IOException e) {
			}
		}
	}
	
	public static void onBreak(BlockBreakEvent event) {
		if (event.getBlock().getType() == Material.SKULL) {
			Skull skull = (Skull)event.getBlock().getState();
			try {

			
				if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
					if (audioSpeakerManager.speakers.get(event.getBlock().getLocation()) != null) {
						
						String sound = audioSpeakerManager.sounds.get(audioSpeakerManager.speakers.get(event.getBlock().getLocation()).getSoundId()).getFile();
						File speakerfile = new File("plugins/OpenAudio/speakers/speakers/"+event.getBlock().getLocation().getBlockX()+".0-"+event.getBlock().getLocation().getBlockY()+".0-"+event.getBlock().getLocation().getBlockZ()+".0.yml");
						
						audioSpeakerManager.speakers.remove(event.getBlock().getLocation());
						
						if (speakerfile.delete()) {
							event.getPlayer().sendMessage(Main.prefix + ChatColor.GREEN + "Successfully removed speaker!");
						} else {
							event.getPlayer().sendMessage(Main.prefix + ChatColor.RED + "Failed to remove speaker!");
							event.setCancelled(true);
						}
						
					} else {
						event.getPlayer().sendMessage(Main.prefix + ChatColor.RED + "Did not remove speaker, no sound assigned to this speaker.");
					}
				}
			} catch(NullPointerException e) {
				
			}
		}
	}
	
	public static void onPlace(BlockPlaceEvent event) {
		if (event.getBlock().getType() == Material.SKULL) {
			Skull skull = (Skull)event.getBlock().getState();
			if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
				if (placer.get(event.getPlayer()) != null && placer.get(event.getPlayer()) != "olditem") {
					
					
					
					if (audioSpeakerManager.sounds.get(placer.get(event.getPlayer())) == null) {
						saveSound(placer.get(event.getPlayer()));
						audioSpeakerManager.createSound(placer.get(event.getPlayer()) + "_sound", placer.get(event.getPlayer()));
					}
					
					saveSpeaker(placer.get(event.getPlayer()), event.getBlock().getLocation().getWorld().getName(), event.getBlock().getLocation().getX(), event.getBlock().getLocation().getY(), event.getBlock().getLocation().getZ());
					
					event.getPlayer().sendMessage(Main.prefix + ChatColor.GREEN +"Created speaker on X:"+event.getBlock().getLocation().getBlockX()+" Y:"+event.getBlock().getLocation().getBlockY()+" Z:"+event.getBlock().getLocation().getBlockZ()+".");
					
					audioSpeakerManager.createSpeaker(placer.get(event.getPlayer()) + "_speaker", placer.get(event.getPlayer())+"_sound", new Location(event.getBlock().getLocation().getWorld(), event.getBlock().getLocation().getX(), event.getBlock().getLocation().getY(), event.getBlock().getLocation().getZ()));
					
					placer.put(event.getPlayer(), "olditem");
					
				} else {
					event.getPlayer().sendMessage(Main.prefix + ChatColor.RED + "This speaker does not have a sound, please add a new speaker.");
					event.setCancelled(true);
				}
				ItemStack removeskull = new ItemStack(Material.SKULL_ITEM);
		        removeskull.setDurability((short)3);
		        SkullMeta sm = (SkullMeta) removeskull.getItemMeta();
		        sm.setOwner("OpenAudioMc");
		        sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
		        removeskull.setItemMeta(sm);  
		        event.getPlayer().getInventory().remove(removeskull);
			}
		}
	}
	
}
