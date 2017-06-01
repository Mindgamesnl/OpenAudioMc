package net.openaudiomc.speakerSystem.objects;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.Getter;
import lombok.Setter;
import org.bukkit.Bukkit;
import org.bukkit.entity.ArmorStand;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.utils.Callbacknoreturn;
import net.openaudiomc.utils.webUtils;

@Getter
@Setter
public class audioSpeakerSound {

	@Getter private String source;
	@Getter private long duration;
	private Integer schedule;
	@Getter private Integer timestamp;
	@Getter @Setter private Integer volume = 100;
	@Getter @Setter private Integer radius = 9;
	@Getter @Setter private Boolean enabled = true;
	@Getter private File config;

	public audioSpeakerSound(String file, long seconds, Integer volume, Integer range, File config) {
		this.source = file;
		this.config = config;
		this.timestamp = 0;
		if (range != null) {
			this.radius = range;
		}
		if (volume != null && volume != 0) {
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

	public void stop() {
		Bukkit.getScheduler().cancelTask(this.schedule);
	}
}
