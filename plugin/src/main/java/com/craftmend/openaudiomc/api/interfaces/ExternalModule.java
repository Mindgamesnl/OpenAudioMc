package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.modules.ModuleLoaderService;
import org.bukkit.event.Listener;

public abstract class ExternalModule {

    public abstract String getName();
    public abstract String getDescription();
    public abstract void onInitialize();
    public abstract void on(ModuleEvent event);

    public void registerEvents(Listener listener) {
        OpenAudioMc.getService(ModuleLoaderService.class).registerSpigotEvents(listener, this);
    }

    protected void log(String message) {
        OpenAudioLogger.toConsole("[module-" + getName() + "] " + message);
    }

}
