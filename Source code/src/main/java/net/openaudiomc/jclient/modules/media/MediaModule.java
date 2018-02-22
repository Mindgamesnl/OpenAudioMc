package net.openaudiomc.jclient.modules.media;

import com.sk89q.worldguard.bukkit.WorldGuardPlugin;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.media.objects.AudioRegion;
import net.openaudiomc.jclient.modules.media.objects.AudioSpeaker;
import net.openaudiomc.jclient.modules.media.tasks.PlayerRegionCheck;

import net.openaudiomc.jclient.modules.media.tasks.PlayerSpeakerCheck;
import net.openaudiomc.jclient.utils.config.ConfigStorageRegion;
import net.openaudiomc.jclient.utils.config.ConfigStorageSpeakerLocation;
import net.openaudiomc.jclient.utils.config.ConfigStorageSpeakerMedia;
import org.bukkit.Bukkit;
import org.bukkit.Location;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class MediaModule {

    @Getter private WorldGuardPlugin worldGuardPlugin;
    @Getter private Map<String, AudioRegion> regions = new ConcurrentHashMap<>();

    @Getter private Map<String, AudioSpeaker> speakerMedia = new ConcurrentHashMap<>();
    @Getter private Map<Location, String> speakers = new ConcurrentHashMap<>();

    public MediaModule(OpenAudioMc plugin) {

        if (Bukkit.getServer().getPluginManager().isPluginEnabled("WorldGuard")) {
            System.out.println("[OpenAudioMc] Found worldguard! Let's enable regions!");
            worldGuardPlugin = (WorldGuardPlugin) Bukkit.getServer().getPluginManager().getPlugin("WorldGuard");
            Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, new PlayerRegionCheck(), 20, 20);
            loadRegions();
        }

        Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, new PlayerSpeakerCheck(), 20, 20);

        loadSpeakerMedia();
        loadSpeakers();
    }

    public void loadSpeakerMedia() {
        OpenAudioMc.getInstance().getServer().getScheduler().runTaskAsynchronously(OpenAudioMc.getInstance(), () -> {
            for(ConfigStorageSpeakerMedia speakerMedia : OpenAudioMc.getInstance().getConf().getStorage().getSpeakerMedias()) {
                if(!this.speakerMedia.containsKey(speakerMedia.getName())) {
                    this.speakerMedia.put(speakerMedia.getName(), new AudioSpeaker(speakerMedia.getName(), speakerMedia.getSource()));
                }
            }
        });
    }

    public void loadSpeakers() {
        OpenAudioMc.getInstance().getServer().getScheduler().runTaskAsynchronously(OpenAudioMc.getInstance(), () -> {
            for(ConfigStorageSpeakerLocation speakerLocation : OpenAudioMc.getInstance().getConf().getStorage().getSpeakerLocations()) {
                Location location = new Location(Bukkit.getWorld(speakerLocation.getWorld()), speakerLocation.getX(), speakerLocation.getY(), speakerLocation.getZ());
                if(!speakers.containsKey(location)) {
                    speakers.put(location, speakerLocation.getSound());
                }
            }
        });
    }

    public void destroySpeaker(Location loc) {
        OpenAudioMc.getInstance().getServer().getScheduler().runTaskAsynchronously(OpenAudioMc.getInstance(), () -> {
            for(ConfigStorageSpeakerLocation speakerLocation : OpenAudioMc.getInstance().getConf().getStorage().getSpeakerLocations()) {
                Location location = new Location(Bukkit.getWorld(speakerLocation.getWorld()), speakerLocation.getX(), speakerLocation.getY(), speakerLocation.getZ());
                if(location.equals(loc)) {
                    OpenAudioMc.getInstance().getConf().getStorage().deleteSpeakerLocation(speakerLocation);
                    speakers.remove(location);
                }
            }
        });
    }

    public void placeSpeaker(Location loc, String sound) {
        OpenAudioMc.getInstance().getServer().getScheduler().runTaskAsynchronously(OpenAudioMc.getInstance(), () -> {
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
        });
    }

    public String urlToId(String url) {
        return url.replace(".", "--_--");
    }

    public void loadRegions() {
        OpenAudioMc.getInstance().getServer().getScheduler().runTaskAsynchronously(OpenAudioMc.getInstance(), () -> {
            for(ConfigStorageRegion region : OpenAudioMc.getInstance().getConf().getStorage().getRegions()) {
                if(!regions.containsKey(region.getName())) {
                    regions.put(region.getName(), new AudioRegion(region.getName(), region.getSource()));
                }
            }
        });
    }
}
