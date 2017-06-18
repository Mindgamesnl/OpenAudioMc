package net.openaudiomc.speakersystem.objects;

import java.io.File;

import lombok.Getter;
import lombok.Setter;
import org.bukkit.Bukkit;

import net.openaudiomc.core.Main;

@Getter
@Setter
public class AudioSpeakerSound {

	@Getter private String source;
	@Getter private long duration;
	private Integer schedule;
	@Getter private Integer timestamp;
	@Getter @Setter private Integer volume = 100;
	@Getter @Setter private Integer radius = 9;
	@Getter @Setter private Boolean enabled = true;
	@Getter private File config;

	public AudioSpeakerSound(String file, long seconds, Integer volume, Integer range, File config) {
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
		this.schedule = Bukkit.getScheduler().scheduleAsyncRepeatingTask(Main.get(), new Runnable() {
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
