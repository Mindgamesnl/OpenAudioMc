package com.craftmend.openaudiomc.spigot.modules.regions.service;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.services.dependency.DependencyHandler;
import org.bukkit.plugin.Plugin;

public class RegionService implements DependencyHandler {
    private final OpenAudioMcSpigot spigot;

    @Override
    public void onLoad(String pluginName, Plugin plugin) {
        spigot.setRegionModule(new RegionModule(null));
    }

    public RegionService(final OpenAudioMcSpigot spigot) {
        this.spigot = spigot;
    }
}
