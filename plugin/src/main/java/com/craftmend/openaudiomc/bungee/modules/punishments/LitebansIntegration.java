package com.craftmend.openaudiomc.bungee.modules.punishments;

import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.events.ClientPreAuthEvent;
import com.craftmend.openaudiomc.api.impl.event.events.ClientRequestVoiceEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.bungee.modules.dependency.DependencyHandler;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import litebans.api.Database;
import net.md_5.bungee.api.plugin.Plugin;

public class LitebansIntegration implements DependencyHandler {

    @Override
    public void onLoad(String pluginName, Plugin plugin) {
        // enable voicechat blocking for muted players

        ApiEventDriver driver = AudioApi.getInstance().getEventDriver();
        if (driver.isSupported(ClientRequestVoiceEvent.class)) {
            driver.on(ClientRequestVoiceEvent.class)
                    .setHandler(event -> {

                        boolean isMuted = Database.get().isPlayerMuted(event.getRequester().getOwnerUUID(), null);

                        if (isMuted) {
                            OpenAudioLogger.toConsole("Blocking voicechat for " + event.getRequester().getPlayer().getName() + " because they are muted on LiteBans");
                            event.setCanceled(true);
                        }
                    });
        }
    }

}
