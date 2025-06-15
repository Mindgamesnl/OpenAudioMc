package com.craftmend.openaudiomc.spigot.modules.punishments;

import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.ClientEnableVoiceEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.services.dependency.DependencyHandler;
import com.earth2me.essentials.Essentials;
import com.earth2me.essentials.User;
import org.bukkit.Bukkit;
import org.bukkit.plugin.Plugin;

public class EssentialsIntegration implements DependencyHandler {

    @Override
    public void onLoad(String pluginName, Plugin plugin) {
        // enable voicechat blocking for muted players with Essentials :D
        EventApi.getInstance().registerHandler(ClientEnableVoiceEvent.class, event -> {
            User user = ((Essentials) Bukkit.getServer().getPluginManager().getPlugin("Essentials")).getUser(event.getClient().getActor().getUniqueId());
            if (user == null) return;
            if (user.isMuted()) {
                OpenAudioLogger.warn("Blocking voicechat for " + event.getClient().getActor().getName() + " because they are muted on Essentials");
                event.setCancelled(true);
            }
        });

    }

}
