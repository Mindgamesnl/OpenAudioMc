package com.craftmend.openaudiomc.bungee.modules.punishments;

import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.ClientEnableVoiceEvent;
import com.craftmend.openaudiomc.bungee.modules.dependency.DependencyHandler;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import litebans.api.Database;
import net.md_5.bungee.api.plugin.Plugin;

public class LitebansIntegration implements DependencyHandler {

    @Override
    public void onLoad(String pluginName, Plugin plugin) {
        // enable voicechat blocking for muted players

        EventApi.getInstance().registerHandler(ClientEnableVoiceEvent.class, event -> {
            boolean isMuted = Database.get().isPlayerMuted(event.getClient().getActor().getUniqueId(), null);
            if (isMuted) {
                OpenAudioLogger.warn("Blocking voicechat for " + event.getClient().getActor().getName() + " because they are muted on LiteBans");
                event.setCancelled(true);
            }
        });
    }

}
