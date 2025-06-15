package com.craftmend.openaudiomc.bungee.modules.dependency;

import net.md_5.bungee.api.plugin.Plugin;

public interface DependencyHandler {

    void onLoad(String pluginName, Plugin plugin);

}
