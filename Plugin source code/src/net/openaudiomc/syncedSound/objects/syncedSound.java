package net.openaudiomc.syncedSound.objects;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.bukkit.Bukkit;

import net.openaudiomc.minecraft.Main;

public class syncedSound {

	String source = "";
	String lenth = "";
	String id = "";
	long loop = 0;
	Integer schedule = 0;
	Integer timeStamp = 0;
	Integer sycles = 0;
	Boolean playing = false;
    String soundid = "";


	//constructor
	public syncedSound(String id, String url, String length, String soundid) {

		this.id = id;
		this.soundid = soundid;
		this.source = url;

		try {
			DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
		    Date reference = dateFormat.parse("00:00:00");
		    Date date = dateFormat.parse(length);
		    long seconds = (date.getTime() - reference.getTime()) / 1000L;
		    this.loop = seconds ;
		    this.playing = true;
		} catch (ParseException e) {}


		this.schedule = Bukkit.getScheduler().scheduleSyncRepeatingTask(Main.getPL(), new Runnable() {
            @Override
            public void run() {
            	sycleTask();
            }
        }, 0, 20);
	}


	//functions
    public void restart() {
        this.lenth = "";
        this.loop = 0;
        this.schedule = 0;
        this.timeStamp = 0;
        this.sycles = 0;
        String lstring = this.lenth;
        try {
            DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
            Date reference = dateFormat.parse("00:00:00");
            Date date = dateFormat.parse(lstring);
            long seconds = (date.getTime() - reference.getTime()) / 1000L;
            this.loop = seconds ;
            this.playing = true;
        } catch (ParseException e) {}


        this.schedule = Bukkit.getScheduler().scheduleSyncRepeatingTask(Main.getPL(), new Runnable() {
            @Override
            public void run() {
                sycleTask();
            }
        }, 0, 20);
    }
    
	public void endTask() {
		 Bukkit.getScheduler().cancelTask(this.schedule);
		 this.playing = false;
	}
	
	public void sycleTask() {
		if (this.sycles > this.loop) {
			endTask();
        } else {
     	   this.sycles++;
     	   this.timeStamp++;
        }
	}

	public String getSoundId() {
        return this.soundid;
    }

	//getters
	public String getSrc() {
		return this.source;
	}

	public Integer getTime() {
		return this.timeStamp;
	}

	public Integer getTimeInMs() {
		return this.timeStamp * 1000;
	}

	public String getId() {
		return this.id;
	}

	public Boolean isPlaying() {
		return this.playing;
	}
}