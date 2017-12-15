package net.openaudiomc.jclient.modules.player;

import com.sk89q.worldedit.bukkit.WorldEditPlugin;
import com.sk89q.worldguard.bukkit.WorldGuardPlugin;
import lombok.Getter;
import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.listeners.JoinQuitListener;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.player.tasks.PlayerRegionCheck;
import org.bukkit.Bukkit;

import java.util.HashMap;
import java.util.Map;


public class PlayerModule {

    @Getter private Map<String, AudioListener> listeners = new HashMap<>();
    @Getter private WorldGuardPlugin worldGuardPlugin;

    public PlayerModule(OpenAudioMc plugin) {
        plugin.getServer().getPluginManager().registerEvents(new JoinQuitListener(), plugin);

        if (Bukkit.getServer().getPluginManager().isPluginEnabled("WorldGuard")) {
            worldGuardPlugin = (WorldGuardPlugin) Bukkit.getServer().getPluginManager().getPlugin("WorldGuard");
            Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, new PlayerRegionCheck(), 20, 20);
        }
    }
}
