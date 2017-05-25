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