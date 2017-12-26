package net.openaudiomc.jclient.modules.media;

import com.sk89q.worldguard.bukkit.WorldGuardPlugin;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.media.objects.AudioRegion;
import net.openaudiomc.jclient.modules.media.objects.AudioSpeaker;
import net.openaudiomc.jclient.modules.media.tasks.PlayerRegionCheck;

import org.bukkit.Bukkit;
import org.bukkit.Location;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

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

        loadSpeakerMedia();
        loadSpeakers();
    }

    public void loadSpeakerMedia() {
        for(String key : OpenAudioMc.getInstance().getConfig().getConfigurationSection("storage.speakermedia").getKeys(false)){
            if (!speakerMedia.containsKey(key) && !key.equalsIgnoreCase("placeholder"))
                speakerMedia.put(key, new AudioSpeaker(key, OpenAudioMc.getInstance().getConfig().getString("storage.speakermedia." + key + ".src")));
        }
    }

    public void loadSpeakers() {
        for(String key : OpenAudioMc.getInstance().getConfig().getConfigurationSection("storage.speakerlocations").getKeys(false)){
            if (!speakers.containsKey(key) && !key.equalsIgnoreCase("placeholder"))
                speakers.put(new Location(
                        Bukkit.getWorld(OpenAudioMc.getInstance().getConfig().getString("storage.speakerlocations." + key + ".world")),
                        OpenAudioMc.getInstance().getConfig().getInt("storage.speakerlocations." + key + ".x"),
                        OpenAudioMc.getInstance().getConfig().getInt("storage.speakerlocations." + key + ".y"),
                        OpenAudioMc.getInstance().getConfig().getInt("storage.speakerlocations." + key + ".z")
                ), OpenAudioMc.getInstance().getConfig().getString("storage.speakerlocations." + key + ".sound"));
        }
    }

    public void destroySpeaker(Location loc) {
        for(String key : OpenAudioMc.getInstance().getConfig().getConfigurationSection("storage.speakerlocations").getKeys(false)){
            Location check = new Location(
                    Bukkit.getWorld(OpenAudioMc.getInstance().getConfig().getString("storage.speakerlocations." + key + ".world")),
                    OpenAudioMc.getInstance().getConfig().getInt("storage.speakerlocations." + key + ".x"),
                    OpenAudioMc.getInstance().getConfig().getInt("storage.speakerlocations." + key + ".y"),
                    OpenAudioMc.getInstance().getConfig().getInt("storage.speakerlocations." + key + ".z"));
            if (loc.equals(check)) {
                OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".world", null);
                OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".x", null);
                OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".y", null);
                OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".z", null);
                OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".sound", null);
                OpenAudioMc.getInstance().saveConfig();
            }
        }
    }

    public void placeSpeaker(Location loc, String sound) {
        //handle sound
        if (!speakerMedia.containsKey(urlToId(sound))) {
            speakerMedia.put(sound, new AudioSpeaker(urlToId(sound), sound));
            OpenAudioMc.getInstance().getConfig().set("storage.speakermedia." + urlToId(sound) + ".src", sound);
        }
        String key = UUID.randomUUID().toString();
        OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".world", loc.getWorld().getName());
        OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".x", loc.getBlockX());
        OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".y", loc.getBlockY());
        OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".z", loc.getBlockZ());
        OpenAudioMc.getInstance().getConfig().set("storage.speakerlocations." + key + ".sound", urlToId(sound));
        OpenAudioMc.getInstance().saveConfig();
    }

    public String urlToId(String url) {
        return url.replaceAll(".", "=").replaceAll("/", "=").replaceAll(":", "=");
    }

    public void loadRegions() {
        for(String key : OpenAudioMc.getInstance().getConfig().getConfigurationSection("storage.regions").getKeys(false)){
            if (!regions.containsKey(key) && !key.equalsIgnoreCase("placeholder"))
                regions.put(key, new AudioRegion(key, OpenAudioMc.getInstance().getConfig().getString("storage.regions." + key + ".src")));
        }
    }

}
