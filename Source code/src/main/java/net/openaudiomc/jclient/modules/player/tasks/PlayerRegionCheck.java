package net.openaudiomc.jclient.modules.player.tasks;

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

        WorldGuardPlugin plugin = OpenAudioMc.getInstance().getPlayerModule().getWorldGuardPlugin();

        for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values()) {

                List<String> regions = new ArrayList<String>();
                for(ProtectedRegion r : WGBukkit.getRegionManager(l.getPlayer().getWorld()).getApplicableRegions(l.getPlayer().getLocation())) {
                    regions.add(r.getId());
                }
                l.updateRegions(regions);

        }
    }
}
