package net.openaudiomc.objects;

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
	
	
	//constructor
	public syncedSound(String id, String url, String length) {
		
		this.id = id;
		
		try {
			DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
		    Date reference = dateFormat.parse("00:00:00");
		    Date date = dateFormat.parse(length);
		    long seconds = (date.getTime() - reference.getTime()) / 1000L;
		    this.loop = seconds ;
		} catch (ParseException e) {}
		
		
		this.schedule = Bukkit.getScheduler().scheduleSyncRepeatingTask(Main.getPL(), new Runnable() {
            @Override
            public void run() {
            	sycleTask();
            }
        }, 0, 20);
	}
	
	
	//functions
	public void endTask() {
		 Bukkit.getScheduler().cancelTask(this.schedule);
	}
	
	
	//sycle task
	public void sycleTask() {
		if (this.sycles > this.loop) {
      	  
        } else {
     	   sycles++;
     	   timeStamp++;
        }
	}
	
	
	//getters
	public String getSrc() {
		return source;
	}
	
	
	public Integer getTime() {
		return timeStamp;
	}
	
	
	public String getId() {
		return id;
	}
}