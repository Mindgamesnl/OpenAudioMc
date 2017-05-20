package net.openaudiomc.speakerSystem.objects;

import org.bukkit.Bukkit;
import org.bukkit.Location;

import java.io.File;

/**
 * Created by mats on 23-4-2017.
 */
public class audioSpeaker {

    private String id;
    private Location location;
    private String soundid;
    private Integer volume = 100;
    private Integer radius = 9;
	private Boolean enabled = true;
	private File file;

    public audioSpeaker(String id, Location loc, String sid, File file) {
    	System.out.println("New speaker. ID:"+sid + " BLOCK:"+loc.getBlock().getType());
    	this.id = id;
    	this.file = file;
    	this.location = loc;
    	this.soundid = sid;
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

    public Location getLoc() {
    	return this.location;
    }
    
    public String getSoundId() {
    	return this.soundid;
    }

    public File getFile() {
        return this.file;
    }
    
    public String getId() {
    	return this.id;
    }

}
