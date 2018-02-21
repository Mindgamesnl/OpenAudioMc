package net.openaudiomc.jclient.modules.media.tasks;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.bukkit.WorldGuardPlugin;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;

import java.util.ArrayList;
import java.util.List;

public class PlayerRegionCheck implements Runnable {
    @Override
    public void run() {
        WorldGuardPlugin plugin = OpenAudioMc.getInstance().getMediaModule().getWorldGuardPlugin();
        for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values()) {
            if (l.getIsConnected()) {
                List<String> regions = new ArrayList<>();
                for(ProtectedRegion r : WGBukkit.getRegionManager(l.getPlayer().getWorld()).getApplicableRegions(l.getPlayer().getLocation())) {
                    regions.add(r.getId());
                }
                l.updateRegions(regions);
            }
        }
    }
}
