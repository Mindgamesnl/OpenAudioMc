package com.craftmend.openaudiomc.spigot.modules.traincarts.service;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.traincarts.TrainCartsModule;
import com.craftmend.openaudiomc.spigot.services.dependency.DependencyHandler;
import lombok.AllArgsConstructor;
import org.bukkit.plugin.Plugin;

@AllArgsConstructor
public class TrainCartsService implements DependencyHandler {

    private OpenAudioMcSpigot spigot;

    @Override
    public void onLoad(String pluginName, Plugin plugin) {
        spigot.setTrainCartsModule(new TrainCartsModule(spigot));
    }
}
