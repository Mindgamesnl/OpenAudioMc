package net.openaudiomc.speakersystem.managers;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import me.mindgamesnl.openaudiomc.publicApi.OpenAudioApi;
import net.openaudiomc.actions.Command;
import net.openaudiomc.utils.CallbackNoReturn;
import net.openaudiomc.utils.WebUtils;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.entity.Player;
import net.openaudiomc.core.Main;
import net.openaudiomc.speakersystem.objects.AudioSpeaker;
import net.openaudiomc.speakersystem.objects.AudioSpeakerSound;
import net.openaudiomc.socket.cm_callback;

public class AudioSpeakerManager {
	
	public static HashMap<String, AudioSpeakerSound> sounds = new HashMap<String, AudioSpeakerSound>();
	public static HashMap<Location, AudioSpeaker> speakers = new HashMap<Location, AudioSpeaker>();
	public static HashMap<String, Boolean> listeners = new HashMap<String, Boolean>();
    public static HashMap<String, Integer> Volumes = new HashMap<String, Integer>();
	public static Boolean running = false;
	public static Integer timer;
	
	public static void createSound(final String id, final String src, final Integer volume, final Integer range, final File file) {
		CallbackNoReturn<String> callback = new CallbackNoReturn<String>() {
		    public void execute(String b) {
		    	try {
			    	DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
				    Date reference = dateFormat.parse("00:00:00");
				    Date date = dateFormat.parse(b);
				    long seconds = (date.getTime() - reference.getTime()) / 1000L;
				    if (volume == null) {
				        Integer volume = 100;
                    }
                    if (range == null) {
                        Integer range = 9;
                    }
				    AudioSpeakerSound netitem = new AudioSpeakerSound(src, seconds, volume, range, file);
					sounds.put(id, netitem);
		    	} catch (ParseException e) {}
		    }
		};
		WebUtils.asyncHttpRequestNoReturn("http://api.openaudiomc.net/plugin/mp3_info.php?s=" + src, callback);
	}
	
	public static void createSpeaker(String id, String soundid, Location loc) {
		AudioSpeaker newitem = new AudioSpeaker(id, loc, soundid);
		speakers.put(loc, newitem);
	}
	
	public static void stopForPlayer(String name) {
		Command.stopAllSpeakers(name);
	}
	
	public static void stop() {
		running = false;
		Bukkit.getScheduler().cancelTask(timer);
	}

	public static void prosessSpeaker(Player p, AudioSpeaker as) {
		double dist = as.getLocation().distance(p.getLocation());
		dist = dist * sounds.get(as.getSoundid()).getVolume();
		int a = (int) Math.round(dist);
		a = a / 10;
		int volume = sounds.get(as.getSoundid()).getVolume() - a;
		String fullvolume = volume+"";
		fullvolume = fullvolume.replaceAll("-", "");


		if (listeners.get(p.getName()) == null || !listeners.get(p.getName())) {

		    //start
            Command.playNewSpeaker(p.getName(), sounds.get(as.getSoundid()).getSource(), sounds.get(as.getSoundid()).getTimestamp(), fullvolume);
            listeners.put(p.getName(), true);
        } else {
		    //update
            if (Volumes.get(p.getName()) == null || Volumes.get(p.getName()) != Integer.parseInt(fullvolume)) {
                Command.updateSpeakerVolume(p.getName(), sounds.get(as.getSoundid()).getSource(), fullvolume);
                Volumes.put(p.getName(), Integer.parseInt(fullvolume));
            }

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
                        AudioSpeaker selected = null;

                        for (Block b : getNearbyBlocks(p.getLocation(), 10)) {
                            //NOTEBLOCK
                            if (b.getType() == Material.NOTE_BLOCK) {
                                if (speakers.get(b.getLocation()).getSoundid() != null) {
                                    if (speakers.get(b.getLocation()).getEnabled()) {
                                        if (Math.abs(speakers.get(b.getLocation()).getLocation().distance(p.getLocation())) < highest || iterations == 0) {
                                            if (Math.abs(speakers.get(b.getLocation()).getLocation().distance(p.getLocation())) < highest || iterations == 0) {
                                                found = true;
                                                selected = speakers.get(b.getLocation());
                                                iterations++;
                                                highest = Math.abs(speakers.get(b.getLocation()).getLocation().distance(p.getLocation()));
                                            }
                                        }
                                    }
                                }
                            } else if (b.getType() == Material.SKULL) {
                                try {
                                    Skull skull = (Skull)b.getState();
                                    if (skull.getOwner().equalsIgnoreCase("OpenAudioMc")) {
                                        if (speakers.get(b.getLocation()).getSoundid() != null && speakers.get(b.getLocation()).getEnabled()) {
                                            if (Math.abs(speakers.get(b.getLocation()).getLocation().distance(p.getLocation())) < highest || iterations == 0) {
                                                if (sounds.get(speakers.get(b.getLocation()).getSoundid()).getEnabled()) {
                                                    found = true;
                                                    selected = speakers.get(b.getLocation());
                                                    iterations++;
                                                    highest = Math.abs(speakers.get(b.getLocation()).getLocation().distance(p.getLocation()));
                                                }
                                            }
                                        }
                                    }
                                } catch(NullPointerException e) {
                                }
                            }
                        }

                        if (found) {
                            prosessSpeaker(p, selected);
                        } else {
                            if (listeners.get(p.getName())) {
                                AudioSpeakerManager.listeners.put(p.getName(), false);
                                Command.stopAllSpeakers(p.getName());
                            }
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
