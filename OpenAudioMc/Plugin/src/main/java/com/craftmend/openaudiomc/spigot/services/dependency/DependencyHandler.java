package com.craftmend.openaudiomc.spigot.services.dependency;

import org.bukkit.plugin.Plugin;
import org.bukkit.plugin.java.JavaPlugin;

public interface DependencyHandler {

    void onLoad(String pluginName, Plugin plugin);

}
