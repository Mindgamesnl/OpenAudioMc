package net.openaudiomc.speakerSystem;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import net.openaudiomc.speakerSystem.objects.audioSpeaker;
import net.openaudiomc.utils.oaStorage;
import org.bukkit.*;
import org.bukkit.block.Skull;
import org.bukkit.configuration.InvalidConfigurationException;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.SkullType;
import org.bukkit.inventory.meta.SkullMeta;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.speakerSystem.managers.audioSpeakerManager;

/**
 * Created by mats on 23-4-2017.
 */
public class speakerMain {
	
	public static HashMap<Player, String> placer = new HashMap<Player, String>();
	public static HashMap<Player, ArrayList<audioSpeaker>> selection = new HashMap<Player, ArrayList<audioSpeaker>>();
	
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
			} catch(NullPointerException e) {

			}
		}
	}
	
	public static void loadSounds() {
		try {
		YamlConfiguration config = new YamlConfiguration();
		File[] files = new File("plugins/OpenAudio/speakers/sounds").listFiles();
		for(File file : files){
				try {
					config.load(file);
					audioSpeakerManager.createSound(config.getString("src")+"_sound", config.getString("src"));
				} catch (FileNotFoundException e) {
				} catch (IOException e) {
				} catch (InvalidConfigurationException e) {
				}
			}
		} catch(NullPointerException e) {

		}
	}
	
	public static void loadSpeaker() {
		try {
		YamlConfiguration config = new YamlConfiguration();
		File[] files = new File("plugins/OpenAudio/speakers/speakers").listFiles();
		for(File file : files){
		    try {
	    		config.load(file);
	    		
	    		audioSpeakerManager.createSpeaker(config.getString("src")+"_speaker", config.getString("src")+"_sound", new Location(Bukkit.getWorld(config.getString("world")), config.getLong("x"),config.getLong("y"),config.getLong("z")));
	    		
	    		audioSpeakerManager.createSound(config.getString("src")+"_sound", config.getString("src"));

				oaStorage storage = new oaStorage(audioSpeakerManager.speakers.get(new Location(Bukkit.getWorld(config.getString("world")), config.getLong("x"),config.getLong("y"),config.getLong("z"))).getSoundId());

				if (storage.get("volume") != null) {
					audioSpeakerManager.sounds.get(audioSpeakerManager.speakers.get(new Location(Bukkit.getWorld(config.getString("world")), config.getLong("x"),config.getLong("y"),config.getLong("z"))).getSoundId()).setVolume(Integer.parseInt((String) storage.get("volume")));
				}

				if (storage.get("radius") != null) {
					audioSpeakerManager.sounds.get(audioSpeakerManager.speakers.get(new Location(Bukkit.getWorld(config.getString("world")), config.getLong("x"),config.getLong("y"),config.getLong("z"))).getSoundId()).setRadius(Integer.parseInt((String) storage.get("radius")));
                }

		    } catch (FileNotFoundException e) {
		    } catch (IOException e) {
		    } catch (InvalidConfigurationException e) {
		    }
		}
		} catch(NullPointerException e) {

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

	public static void PlayerInteractEvent(PlayerInteractEvent event) {

		Player p = event.getPlayer();

		if (p.hasPermission("openaudio.speakers.interact")) {
			if (event.getClickedBlock().getType() == Material.SKULL || event.getClickedBlock().getType() == Material.NOTE_BLOCK) {
				if (audioSpeakerManager.speakers.get(event.getClickedBlock().getLocation()) != null) {
					if (selection.get(p) != null) {
						if (!selection.get(p).contains(audioSpeakerManager.speakers.get(event.getClickedBlock().getLocation()))) {
							selection.get(p).add(audioSpeakerManager.speakers.get(event.getClickedBlock().getLocation()));
							p.sendMessage(Main.prefix + "Added speaker to selection.");
						} else {
							selection.get(p).remove(audioSpeakerManager.speakers.get(event.getClickedBlock().getLocation()));
							p.sendMessage(Main.prefix + "Removed speaker from selection.");
						}
					} else {
						ArrayList<audioSpeaker> selected = new ArrayList<audioSpeaker>();
						selected.add(audioSpeakerManager.speakers.get(event.getClickedBlock().getLocation()));
						selection.put(p, selected);
						p.sendMessage(Main.prefix + "Added speaker to selection.");
					}
				} else {
					p.sendMessage(Main.prefix + "This block is not a speaker.");
				}
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
		try {
			if (event.getBlock().getType() == Material.SKULL) {
				Skull skull = (Skull) event.getBlock().getState();
				if (skull.getSkullType() == SkullType.PLAYER	) {
					if (skull.hasOwner()) {
						if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
							if (placer.get(event.getPlayer()) != null && placer.get(event.getPlayer()) != "olditem") {


								if (audioSpeakerManager.sounds.get(placer.get(event.getPlayer())) == null) {
									saveSound(placer.get(event.getPlayer()));
									audioSpeakerManager.createSound(placer.get(event.getPlayer()) + "_sound", placer.get(event.getPlayer()));
								}

								saveSpeaker(placer.get(event.getPlayer()), event.getBlock().getLocation().getWorld().getName(), event.getBlock().getLocation().getX(), event.getBlock().getLocation().getY(), event.getBlock().getLocation().getZ());

								event.getPlayer().sendMessage(Main.prefix + ChatColor.GREEN + "Created speaker on X:" + event.getBlock().getLocation().getBlockX() + " Y:" + event.getBlock().getLocation().getBlockY() + " Z:" + event.getBlock().getLocation().getBlockZ() + ".");

								audioSpeakerManager.createSpeaker(placer.get(event.getPlayer()) + "_speaker", placer.get(event.getPlayer()) + "_sound", new Location(event.getBlock().getLocation().getWorld(), event.getBlock().getLocation().getX(), event.getBlock().getLocation().getY(), event.getBlock().getLocation().getZ()));

							//	placer.put(event.getPlayer(), "olditem");

							} else {
								event.getPlayer().sendMessage(Main.prefix + ChatColor.RED + "This speaker does not have a sound, please add a new speaker.");
								event.setCancelled(true);
							}
							ItemStack removeskull = new ItemStack(Material.SKULL_ITEM);
							removeskull.setDurability((short) 3);
							SkullMeta sm = (SkullMeta) removeskull.getItemMeta();
							sm.setOwner("OpenAudioMc");
							sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
							removeskull.setItemMeta(sm);
							event.getPlayer().getInventory().remove(removeskull);
						}
					}
				}
			}


		} catch (NullPointerException e) {
			//event.getPlayer().sendMessage(Main.prefix + ChatColor.RED + "Placing the skull failed some how, please send a screenshot of " + ChatColor.GREEN + "/oa debug" + ChatColor.RED + " to the developers.");
		}
	}
	
}
