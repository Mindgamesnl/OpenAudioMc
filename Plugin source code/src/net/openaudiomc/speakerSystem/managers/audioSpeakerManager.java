package net.openaudiomc.speakerSystem.managers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.bukkit.Bukkit;
import org.bukkit.Effect;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.entity.EntityType;
import org.bukkit.entity.Firework;
import org.bukkit.entity.Player;

import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;
import net.openaudiomc.actions.command;
import net.openaudiomc.minecraft.Main;
import net.openaudiomc.speakerSystem.objects.audioSpeaker;
import net.openaudiomc.speakerSystem.objects.audioSpeakerSound;
import net.openaudiomc.utils.Callbacknoreturn;
import net.openaudiomc.utils.webUtils;
import net.openaudiomc.socket.cm_callback;

public class audioSpeakerManager {
	
	public static HashMap<String, audioSpeakerSound> sounds = new HashMap<String, audioSpeakerSound>();
	public static HashMap<Location, audioSpeaker> speakers = new HashMap<Location, audioSpeaker>();
	public static HashMap<String, Boolean> listeners = new HashMap<String, Boolean>();
	public static HashMap<String, ArrayList<String>> soundsOfP = new HashMap<String, ArrayList<String>>();
	public static Boolean running = false;
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
	
	public static void stop() {
		running = false;
		Bukkit.getScheduler().cancelTask(timer);
	}

	public static void prosessSpeaker(Player p, audioSpeaker as) {
		double dist = as.getLoc().distance(p.getLocation());
		dist = dist * as.getVolume();
		int a = (int) Math.round(dist);
		a = a / as.getRadius();
		int volume = as.getVolume() - a;
		String fullvolume = volume+"";
		fullvolume = fullvolume.replaceAll("-", "");


		if (listeners.get(p.getName()) == null || !listeners.get(p.getName())) {
		    //start
            command.playNewSpeaker(p.getName(), sounds.get(as.getSoundId()).getFile(), sounds.get(as.getSoundId()).getTime(), fullvolume);
        } else {
		    //update
            command.updateSpeakerVolume(p.getName(), sounds.get(as.getSoundId()).getFile(), fullvolume);
        }

	}

	public static void Init() {
		running = true;
		timer = Bukkit.getScheduler().scheduleAsyncRepeatingTask(Main.getPL(), new Runnable() {
		    @Override
		    public void run() {
				for (Player p : Bukkit.getOnlinePlayers()) {
					if (OpenAudioApi.isConnected(p)) {

                        Boolean found = false;
                        double highest = 0;
                        Integer iterations = 0;
                        audioSpeaker selected = null;


                        for (Block b : getNearbyBlocks(p.getLocation(), 10)) {

                            //NOTEBLOCK
                            if (b.getType() == Material.NOTE_BLOCK) {
                                if (speakers.get(b.getLocation()).getSoundId() != null) {
                                    if (Math.abs(speakers.get(b.getLocation()).getLoc().distance(p.getLocation())) < highest || iterations == 0) {
                                        found = true;
                                        selected = speakers.get(b.getLocation());
                                        iterations++;
                                        highest = Math.abs(speakers.get(b.getLocation()).getLoc().distance(p.getLocation()));
                                    }
                                }
                            }

                        }

                        if (found) {

                        } else {
                            command.stopAllSpeakers(p.getName());
                        }

					}
				}
		    }
		}, 0, cm_callback.speakerTick);
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
