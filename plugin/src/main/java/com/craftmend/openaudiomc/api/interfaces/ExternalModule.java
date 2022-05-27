package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.modules.ModuleLoaderService;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import lombok.Getter;
import lombok.Setter;
import org.bukkit.Bukkit;
import org.bukkit.event.Listener;

public abstract class ExternalModule {

    @Getter @Setter private ClassLoader loader;

    public abstract String getName();
    public abstract String getDescription();
    public abstract void onInitialize();
    public abstract void on(ModuleEvent event);

    public void registerEvents(Listener listener) {
        Bukkit.getPluginManager().registerEvents(listener, OpenAudioMcSpigot.getInstance());
    }

    protected void log(String message) {
        OpenAudioLogger.toConsole("[module-" + getName() + "] " + message);
    }

}
