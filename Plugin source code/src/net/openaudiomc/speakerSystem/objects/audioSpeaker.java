package net.openaudiomc.speakerSystem.objects;

import org.bukkit.Bukkit;
import org.bukkit.Location;

/**
 * Created by mats on 23-4-2017.
 */
public class audioSpeaker {
	
	String id;
	Location location;
	String soundid;
	Integer volume = 100;
	Integer radius = 9;
	
    public audioSpeaker(String id, Location loc, String sid) {
    	System.out.println("New speaker. ID:"+sid + " BLOCK:"+loc.getBlock().getType());
    	this.id = id;
    	this.location = loc;
    	this.soundid = sid;
    	
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

    public Location getLoc() {
    	return this.location;
    }
    
    public String getSoundId() {
    	return this.soundid;
    }
    
    public String getId() {
    	return this.id;
    }

}
