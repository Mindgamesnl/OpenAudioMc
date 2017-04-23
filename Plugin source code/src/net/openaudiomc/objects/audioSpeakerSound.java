package net.openaudiomc.objects;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.bukkit.Bukkit;
import org.bukkit.entity.ArmorStand;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.utils.Callbacknoreturn;
import net.openaudiomc.utils.webUtils;


public class audioSpeakerSound {
	
	HashMap<String, ArmorStand> standList;
	String source;
	long duration;
	long thisint;
	Integer schedule;
	Integer timestamp;
	
	public audioSpeakerSound(String file) {
		this.source = file;
		this.timestamp = 0;
		updateDuration();
		startRun();
	}
	
	//life cycle
	void updateDuration() {
		Callbacknoreturn<String> callback = new Callbacknoreturn<String>() {
		    public void execute(String b) {
		    	try {
			    	DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
				    Date reference = dateFormat.parse("00:00:00");
				    Date date = dateFormat.parse(b);
				    long seconds = (date.getTime() - reference.getTime()) / 1000L;
				    thisint = seconds;
		    	} catch (ParseException e) {}
		    }
		};
		this.duration = thisint;
		webUtils.asyncHttpRequestNoReturn("http://api.openaudiomc.net/plugin/mp3_info.php?s=" + this.source, callback);
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
