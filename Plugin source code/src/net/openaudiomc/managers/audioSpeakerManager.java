package net.openaudiomc.managers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.entity.Player;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.objects.audioSpeaker;
import net.openaudiomc.objects.audioSpeakerSound;

public class audioSpeakerManager {
	
	public static HashMap<String, audioSpeakerSound> sounds = new HashMap<String, audioSpeakerSound>();
	public static HashMap<Location, audioSpeaker> speakers = new HashMap<Location, audioSpeaker>();
	public static Integer timer;
	
	public static void createSound(String id, String src) {
		audioSpeakerSound netitem = new audioSpeakerSound(src);
		sounds.put(id, netitem);
	}
	
	public static void createSpeaker(String id, String soundid, Location loc) {
		audioSpeaker newitem = new audioSpeaker(id, loc, soundid);
		speakers.put(loc, newitem);
	}
	
	@SuppressWarnings("deprecation")
	public static void Init() {
		timer = Bukkit.getScheduler().scheduleAsyncRepeatingTask(Main.getPL(), new Runnable() {
            @Override
            public void run() {
            	for (Player p : Bukkit.getOnlinePlayers()) {
            		for (Block b : getNearbyBlocks(p.getLocation(), 20)) {
            			if (b.getType() == Material.SKULL) {
            				Skull skull = (Skull)b.getState();
            				if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
            					double dist = speakers.get(b.getLocation()).getLoc().distance(p.getLocation());
            					dist = dist * 100;
            					int a = (int) Math.round(dist);
            					a = a / 20;
            					int volume = 100 - a;
            					String fullvolume = volume+"";
            					fullvolume = fullvolume.replaceAll("-", "");
            					Bukkit.broadcastMessage(""+ p.getName()+": " + fullvolume);
            				}
            			}
            		}
            	}
            }
        }, 0, 40);
	}
	
	public static List<Block> getNearbyBlocks(Location location, int radius) {
        List<Block> blocks = new ArrayList<Block>();
        for(int x = location.getBlockX() - radius; x <= location.getBlockX() + radius; x++) {
            for(int y = location.getBlockY() - radius; y <= location.getBlockY() + radius; y++) {
                for(int z = location.getBlockZ() - radius; z <= location.getBlockZ() + radius; z++) {
                   blocks.add(location.getWorld().getBlockAt(x, y, z));
                }
            }
        }
        return blocks;
    }
	
	

}
