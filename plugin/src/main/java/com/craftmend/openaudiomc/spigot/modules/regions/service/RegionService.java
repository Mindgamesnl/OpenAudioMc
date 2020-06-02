package com.craftmend.openaudiomc.spigot.modules.regions.service;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.services.dependency.DependencyHandler;
import lombok.AllArgsConstructor;
import org.bukkit.plugin.Plugin;

@AllArgsConstructor
public class RegionService implements DependencyHandler {

    private OpenAudioMcSpigot spigot;

    @Override
    public void onLoad(String pluginName, Plugin plugin) {
        spigot.setRegionModule(new RegionModule(spigot));
    }
}
