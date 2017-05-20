package net.openaudiomc.speakerSystem.objects;

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
	Integer schedule;
	Integer timestamp;
	private Integer volume = 100;
	private Integer radius = 9;
	private Boolean enabled = true;
	
	public audioSpeakerSound(String file, long seconds) {
		this.source = file;
		this.timestamp = 0;
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
