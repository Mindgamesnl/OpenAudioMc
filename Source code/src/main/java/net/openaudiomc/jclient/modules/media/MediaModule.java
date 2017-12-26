package net.openaudiomc.jclient.modules.media;

import com.sk89q.worldguard.bukkit.WorldGuardPlugin;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.media.objects.AudioRegion;
import net.openaudiomc.jclient.modules.media.tasks.PlayerRegionCheck;

import org.bukkit.Bukkit;

import java.util.HashMap;
import java.util.Map;

public class MediaModule {

    @Getter private WorldGuardPlugin worldGuardPlugin;
    @Getter public Map<String, AudioRegion> regions = new HashMap<>();

    public MediaModule(OpenAudioMc plugin) {

        if (Bukkit.getServer().getPluginManager().isPluginEnabled("WorldGuard")) {
            plugin.getLogger().fine("Found worldguard! lets enable regions!");
            System.out.println("Found worldguard! lets enable regions!");
            worldGuardPlugin = (WorldGuardPlugin) Bukkit.getServer().getPluginManager().getPlugin("WorldGuard");
            Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, new PlayerRegionCheck(), 20, 20);
            loadRegions();
        }
    }

    public void loadRegions() {
        for(String key : OpenAudioMc.getInstance().getConfig().getConfigurationSection("storage.regions").getKeys(false)){
            if (!regions.containsKey(key) && !key.equalsIgnoreCase("placeholder"))
                regions.put(key, new AudioRegion(key, OpenAudioMc.getInstance().getConfig().getString("storage.regions." + key + ".src")));
        }
    }

}
