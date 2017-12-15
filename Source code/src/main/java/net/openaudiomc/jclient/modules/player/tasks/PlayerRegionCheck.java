package net.openaudiomc.jclient.modules.player.tasks;

import com.sk89q.worldguard.bukkit.WorldGuardPlugin;
import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;

public class PlayerRegionCheck implements Runnable {
    @Override
    public void run() {

        WorldGuardPlugin plugin = OpenAudioMc.getInstance().getPlayerModule().getWorldGuardPlugin();

        for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values()) {
            if (l.getIsConnected()) {
                
            }
        }
    }
}
