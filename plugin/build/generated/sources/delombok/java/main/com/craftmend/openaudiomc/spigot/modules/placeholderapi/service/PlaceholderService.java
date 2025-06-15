package com.craftmend.openaudiomc.spigot.modules.placeholderapi.service;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.placeholderapi.PlaceholderModule;
import com.craftmend.openaudiomc.spigot.services.dependency.DependencyHandler;
import org.bukkit.plugin.Plugin;

public class PlaceholderService implements DependencyHandler {
    private OpenAudioMcSpigot spigot;

    @Override
    public void onLoad(String pluginName, Plugin plugin) {
        new PlaceholderModule(spigot).register();
    }

    public PlaceholderService(final OpenAudioMcSpigot spigot) {
        this.spigot = spigot;
    }
}
