package net.openaudiomc.jclient.modules.media;

import com.sk89q.worldguard.bukkit.WorldGuardPlugin;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.media.objects.AudioRegion;
import net.openaudiomc.jclient.modules.media.objects.AudioSpeaker;
import net.openaudiomc.jclient.modules.media.tasks.PlayerRegionCheck;

import net.openaudiomc.jclient.modules.media.tasks.PlayerSpeakerCheck;
import net.openaudiomc.jclient.utils.config.Config;
import net.openaudiomc.jclient.utils.config.ConfigStorageRegion;
import net.openaudiomc.jclient.utils.config.ConfigStorageSpeakerLocation;
import net.openaudiomc.jclient.utils.config.ConfigStorageSpeakerMedia;
import org.bukkit.Bukkit;
import org.bukkit.Location;

import java.util.*;

public class MediaModule {

    //region shit
    @Getter private WorldGuardPlugin worldGuardPlugin;
    @Getter private Map<String, AudioRegion> regions = new HashMap<>();

    //hey look at that! speaker shit!
    @Getter private Map<String, AudioSpeaker> speakerMedia = new HashMap<>();
    @Getter private Map<Location, String> speakers = new HashMap<>();

    public MediaModule(OpenAudioMc plugin) {

        if (Bukkit.getServer().getPluginManager().isPluginEnabled("WorldGuard")) {
            System.out.println("[OpenAudioMc] Found worldguard! lets enable regions!");
            worldGuardPlugin = (WorldGuardPlugin) Bukkit.getServer().getPluginManager().getPlugin("WorldGuard");
            Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, new PlayerRegionCheck(), 20, 20);
            loadRegions();
        }

        Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, new PlayerSpeakerCheck(), 20, 20);

        loadSpeakerMedia();
        loadSpeakers();
    }

    public void loadSpeakerMedia() {
        for(ConfigStorageSpeakerMedia speakerMedia : OpenAudioMc.getInstance().getConf().getStorage().getSpeakerMedias()) {
            if(!this.speakerMedia.containsKey(speakerMedia.getName())) {
                this.speakerMedia.put(speakerMedia.getName(), new AudioSpeaker(speakerMedia.getName(), speakerMedia.getSource()));
            }
        }
    }

    public void loadSpeakers() {
        for(ConfigStorageSpeakerLocation speakerLocation : OpenAudioMc.getInstance().getConf().getStorage().getSpeakerLocations()) {
            Location location = new Location(Bukkit.getWorld(speakerLocation.getWorld()), speakerLocation.getX(), speakerLocation.getY(), speakerLocation.getZ());
            if(!speakers.containsKey(location)) {
                speakers.put(location, speakerLocation.getSound());
            }
        }
    }

    public void destroySpeaker(Location loc) {
        List<Location> removeme = new ArrayList<>();
        for(ConfigStorageSpeakerLocation speakerLocation : OpenAudioMc.getInstance().getConf().getStorage().getSpeakerLocations()) {
            Location location = new Location(Bukkit.getWorld(speakerLocation.getWorld()), speakerLocation.getX(), speakerLocation.getY(), speakerLocation.getZ());
            if(location.equals(loc)) {
                OpenAudioMc.getInstance().getConf().getStorage().deleteSpeakerLocation(speakerLocation);
                removeme.add(location);
            }
        }
        removeme.forEach(location -> speakers.remove(location));
    }

    public void placeSpeaker(Location loc, String sound) {
        //handle sound
        if (!speakerMedia.containsKey(urlToId(sound))) {
            speakerMedia.put(sound, new AudioSpeaker(urlToId(sound), sound));
            ConfigStorageSpeakerMedia speakerMedia = new ConfigStorageSpeakerMedia();
            speakerMedia.setName(urlToId(sound));
            speakerMedia.setSource(sound);
            OpenAudioMc.getInstance().getConf().getStorage().addSpeakerMedia(speakerMedia);
        }
        String key = UUID.randomUUID().toString();
        ConfigStorageSpeakerLocation speakerLocation = new ConfigStorageSpeakerLocation();
        speakerLocation.setId(UUID.fromString(key));
        speakerLocation.setWorld(loc.getWorld().getName());
        speakerLocation.setX((double) loc.getBlockX());
        speakerLocation.setY((double) loc.getBlockY());
        speakerLocation.setZ((double) loc.getBlockZ());
        speakerLocation.setSound(urlToId(sound));
        OpenAudioMc.getInstance().getConf().getStorage().addSpeakerLocation(speakerLocation);

        loadSpeakerMedia();
        loadSpeakers();
    }

    public String urlToId(String url) {
        return url.replace(".", "--_--");
    }

    public void loadRegions() {
        for(ConfigStorageRegion region : OpenAudioMc.getInstance().getConf().getStorage().getRegions()) {
            if(!regions.containsKey(region.getName())) {
                regions.put(region.getName(), new AudioRegion(region.getName(), region.getSource()));
            }
        }
    }

}
