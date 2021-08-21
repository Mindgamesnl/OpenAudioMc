package com.craftmend.openaudiomc.spigot.modules.punishments;

import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.events.ClientRequestVoiceEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.services.dependency.DependencyHandler;
import com.earth2me.essentials.Essentials;
import org.bukkit.Bukkit;
import org.bukkit.plugin.Plugin;

public class EssentialsIntegration implements DependencyHandler {

    @Override
    public void onLoad(String pluginName, Plugin plugin) {
        // enable voicechat blocking for muted players with Essentials :D
        ApiEventDriver driver = AudioApi.getInstance().getEventDriver();
        Essentials ess = (Essentials) Bukkit.getServer().getPluginManager().getPlugin("Essentials");
        if (driver.isSupported(ClientRequestVoiceEvent.class)) {
            driver.on(ClientRequestVoiceEvent.class)
                    .setHandler(event -> {

                        if (ess.getUser(event.getRequester().getOwnerUUID()) == null) return;
                        boolean isMuted = ess.getUser(event.getRequester().getOwnerUUID()).isMuted();

                        if (isMuted) {
                            OpenAudioLogger.toConsole("Blocking voicechat for " + event.getRequester().getPlayer().getName() + " because they are muted on Essentials");
                            event.setCanceled(true);
                        }
                    });
        }

    }

}
