package com.craftmend.openaudiomc.spigot.modules.proxy.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.ConfigurationPushEvent;
import com.craftmend.openaudiomc.api.impl.event.events.SystemReloadEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.resources.ResourceService;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.configuration.SpigotConfiguration;

public class ModernPacketListener {

    public ModernPacketListener() {
        AudioApi.getInstance().getEventDriver().on(ConfigurationPushEvent.class)
                .setHandler(event -> {
                    OpenAudioLogger.toConsole("Received a config instance from the proxy, updating local resources and reloading...");
                    OpenAudioMc.getService(ResourceService.class).getSavedRoot().setLastConfigContent(event.getFileContent());
                    OpenAudioMc.getService(ResourceService.class).getSavedRoot().setUseConfigFile(true);

                    SpigotConfiguration configuration = (SpigotConfiguration) OpenAudioMc.getInstance().getConfiguration();
                    configuration.loadConfig(OpenAudioMcSpigot.getInstance());
                    AudioApi.getInstance().getEventDriver().fire(new SystemReloadEvent());
                });
    }

}
