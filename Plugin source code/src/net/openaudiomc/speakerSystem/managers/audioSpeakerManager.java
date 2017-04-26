package net.openaudiomc.speakerSystem.managers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.entity.Player;

import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;
import net.openaudiomc.actions.command;
import net.openaudiomc.minecraft.Main;
import net.openaudiomc.speakerSystem.objects.audioSpeaker;
import net.openaudiomc.speakerSystem.objects.audioSpeakerSound;
import net.openaudiomc.utils.Callbacknoreturn;
import net.openaudiomc.utils.webUtils;

public class audioSpeakerManager {
	
	public static HashMap<String, audioSpeakerSound> sounds = new HashMap<String, audioSpeakerSound>();
	public static HashMap<Location, audioSpeaker> speakers = new HashMap<Location, audioSpeaker>();
	public static HashMap<String, Integer> volumes = new HashMap<String, Integer>();
	public static HashMap<String, ArrayList<String>> soundsOfP = new HashMap<String, ArrayList<String>>();
	public static Integer timer;
	
	public static void createSound(final String id, final String src) {
		
		
		
		Callbacknoreturn<String> callback = new Callbacknoreturn<String>() {
		    public void execute(String b) {
		    	try {
			    	DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
				    Date reference = dateFormat.parse("00:00:00");
				    Date date = dateFormat.parse(b);
				    long seconds = (date.getTime() - reference.getTime()) / 1000L;
				    audioSpeakerSound netitem = new audioSpeakerSound(src, seconds);
					sounds.put(id, netitem);
		    	} catch (ParseException e) {}
		    }
		};
		webUtils.asyncHttpRequestNoReturn("http://api.openaudiomc.net/plugin/mp3_info.php?s=" + src, callback);
		
	}
	
	public static void createSpeaker(String id, String soundid, Location loc) {
		audioSpeaker newitem = new audioSpeaker(id, loc, soundid);
		speakers.put(loc, newitem);
	}
	
	public static void stopForPlayer(String name) {
		try {
			audioSpeakerManager.soundsOfP.get(name).clear();
		} catch(NullPointerException e) {
			//user has no speakers
		}
		command.stopAllSpeakers(name);
	}
	
	@SuppressWarnings("deprecation")
	public static void Init() {
		timer = Bukkit.getScheduler().scheduleAsyncRepeatingTask(Main.getPL(), new Runnable() {
		    @Override
		    public void run() {
				for (Player p : Bukkit.getOnlinePlayers()) {
					if (OpenAudioApi.isConnected(p)) {
						if (soundsOfP.get(p.getName()) == null) {
							ArrayList<String> list = new ArrayList<String>();
							list.add("-");
							soundsOfP.put(p.getName(), list);
						}
						Boolean found = false;
						for (Block b : getNearbyBlocks(p.getLocation(), 10)) {
							if (b.getType() == Material.SKULL) {
								Skull skull = (Skull)b.getState();						
								if (skull.getOwner().equalsIgnoreCase("OpenAudioMc") || speakers.get(b.getLocation()).getSoundId() != null) {
									double dist = speakers.get(b.getLocation()).getLoc().distance(p.getLocation());
									dist = dist * 100;
									int a = (int) Math.round(dist);
									a = a / 10;
									int volume = 100 - a;
									String fullvolume = volume+"";
									fullvolume = fullvolume.replaceAll("-", "");
									found = true;
									if (volumes.get(p.getName()) == null || volumes.get(p.getName()) != Integer.parseInt(fullvolume)) {
										if (soundsOfP.get(p.getName()).contains(sounds.get(speakers.get(b.getLocation()).getSoundId()).getFile())) {
											command.updateSpeakerVolume(p.getName(), sounds.get(speakers.get(b.getLocation()).getSoundId()).getFile(), fullvolume);
										} else {
											soundsOfP.get(p.getName()).add(sounds.get(speakers.get(b.getLocation()).getSoundId()).getFile());
											command.playNewSpeaker(p.getName(), sounds.get(speakers.get(b.getLocation()).getSoundId()).getFile(), sounds.get(speakers.get(b.getLocation()).getSoundId()).getTime(), fullvolume);
										}
										volumes.put(p.getName(), Integer.parseInt(fullvolume));
									}
									break;
								}			
							}
						}
						if (!found) {
							if (!soundsOfP.get(p.getName()).isEmpty()) {
								volumes.put(p.getName(), 0);
								soundsOfP.get(p.getName()).clear();
								command.stopAllSpeakers(p.getName());
							}
						}
					}
				}
		    }
		}, 0, 20);
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
