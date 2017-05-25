package net.openaudiomc.speakerSystem.objects;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.bukkit.Bukkit;
import org.bukkit.entity.ArmorStand;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.utils.Callbacknoreturn;
import net.openaudiomc.utils.webUtils;
<<<<<<< HEAD
=======
import net.openaudiomc.socket.cm_callback;

public class audioSpeakerManager {
	
	public static HashMap<String, audioSpeakerSound> sounds = new HashMap<String, audioSpeakerSound>();
	public static HashMap<Location, audioSpeaker> speakers = new HashMap<Location, audioSpeaker>();
	public static HashMap<String, Boolean> listeners = new HashMap<String, Boolean>();
    public static HashMap<String, Integer> Volumes = new HashMap<String, Integer>();
	public static Boolean running = false;
	public static Integer timer;
	
	public static void createSound(final String id, final String src, final Integer volume, final Integer range, final File file) {
		Callbacknoreturn<String> callback = new Callbacknoreturn<String>() {
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
				    audioSpeakerSound netitem = new audioSpeakerSound(src, seconds, volume, range, file);
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
		command.stopAllSpeakers(name);
	}
	
	public static void stop() {
		running = false;
		Bukkit.getScheduler().cancelTask(timer);
	}

	public static void prosessSpeaker(Player p, audioSpeaker as) {
		double dist = as.getLoc().distance(p.getLocation());
		dist = dist * sounds.get(as.getSoundId()).getVolume();
		int a = (int) Math.round(dist);
		a = a / 10;
		int volume = sounds.get(as.getSoundId()).getVolume() - a;
		String fullvolume = volume+"";
		fullvolume = fullvolume.replaceAll("-", "");

        Bukkit.broadcastMessage("1: " + sounds.get(as.getSoundId()).getVolume());
		if (listeners.get(p.getName()) == null || !listeners.get(p.getName())) {

		    //start
            command.playNewSpeaker(p.getName(), sounds.get(as.getSoundId()).getFile(), sounds.get(as.getSoundId()).getTime(), fullvolume);
            listeners.put(p.getName(), true);
        } else {
		    //update
            if (Volumes.get(p.getName()) == null || Volumes.get(p.getName()) != Integer.parseInt(fullvolume)) {
                Bukkit.broadcastMessage("updates");
                command.updateSpeakerVolume(p.getName(), sounds.get(as.getSoundId()).getFile(), fullvolume);
                Volumes.put(p.getName(), Integer.parseInt(fullvolume));
            }
>>>>>>> parent of b8484b9... Final set command


public class audioSpeakerSound {

    private HashMap<String, ArmorStand> standList;
    private String source;
    private long duration;
    private Integer schedule;
    private Integer timestamp;
    private Integer volume = 100;
    private Integer radius = 9;
    private Boolean enabled = true;
    private File config;

    public audioSpeakerSound(String file, long seconds, Integer volume, Integer range, File config) {
        this.source = file;
        this.config = config;
        this.timestamp = 0;
        if (range != null) {
            this.radius = range;
        }
        if (volume != null) {
            this.volume = volume;
        }
        this.duration = seconds;
        startRun();
    }

    void repeat() {
        if (this.timestamp > this.duration) {
            this.timestamp = 0;
        } else {
            this.timestamp++;
        }
    }

    @SuppressWarnings("deprecation")
    void startRun() {
        this.schedule = Bukkit.getScheduler().scheduleAsyncRepeatingTask(Main.getPL(), new Runnable() {
            @Override
            public void run() {
                repeat();
            }
        }, 0, 20);
    }

    public Boolean hasFile() {
        if (this.config != null) {
            return true;
        }
        return false;
    }

    public File getSavedFile() {
        return this.config;
    }

    public Boolean isEnabled() {
        return this.enabled;
    }

    public void setEnabled(Boolean state) {
        this.enabled = state;
    }

    public void setRadius(Integer nr) {
        this.radius = nr;
    }

    public void setVolume(Integer nv) {
        this.volume = nv;
    }

    public Integer getVolume() {
        return this.volume;
    }

    public Integer getRadius() {
        return this.radius;
    }

    //getters and functions
    public long getTime() {
        return this.timestamp;
    }

    public String getFile() {
        return this.source;
    }

    public void stop() {
        Bukkit.getScheduler().cancelTask(this.schedule);
    }

    public void addArmorStand(String id, ArmorStand as) {
        standList.put(id, as);
    }

}