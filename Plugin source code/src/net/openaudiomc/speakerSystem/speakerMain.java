package net.openaudiomc.speakerSystem;

import java.util.HashMap;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Skull;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.speakerSystem.managers.audioSpeakerManager;

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
	
	public static void onPlace(BlockPlaceEvent event) {
		if (event.getBlock().getType() == Material.SKULL) {
			Skull skull = (Skull)event.getBlock().getState();
			if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
				if (placer.get(event.getPlayer()) != null && placer.get(event.getPlayer()) != "olditem") {
					event.getPlayer().sendMessage(Main.prefix + "Creating speaker...");
					if (audioSpeakerManager.sounds.get(placer.get(event.getPlayer())) == null) {
						event.getPlayer().sendMessage(Main.prefix + "Creating sound...");
						audioSpeakerManager.createSound(placer.get(event.getPlayer()) + "_sound", placer.get(event.getPlayer()));
					}
					
					
					
					event.getPlayer().sendMessage(Main.prefix + "Created speaker on X:"+event.getBlock().getLocation().getBlockX()+" Y:"+event.getBlock().getLocation().getBlockY()+" Z:"+event.getBlock().getLocation().getBlockZ()+".");
					
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
