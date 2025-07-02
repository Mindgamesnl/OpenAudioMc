package com.craftmend.openaudiomc.spigot.services.dependency;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import lombok.NoArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.server.PluginEnableEvent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
public class SpigotDependencyService extends Service implements Listener {

    @Inject
    private OpenAudioMcSpigot spigot;

    private final Map<String, List<DependencyHandler>> handlerMap = new HashMap<>();

    @Override
    public void onEnable() {
        spigot.getServer().getPluginManager().registerEvents(this, spigot);
    }

    public SpigotDependencyService ifPluginEnabled(String pluginName, DependencyHandler handler) {
        if (Bukkit.getPluginManager().isPluginEnabled(pluginName)) {
            OpenAudioLogger.info("Plugin " + pluginName + " is already enabled, running handler");
            try {
                handler.onLoad(pluginName, Bukkit.getPluginManager().getPlugin(pluginName));
            } catch (Exception e) {
                throw new RuntimeException("Failed to run handler for " + pluginName, e);
            }
        } else {
            List<DependencyHandler> handlers = handlerMap.getOrDefault(pluginName, new ArrayList<>());
            handlers.add(handler);
            handlerMap.put(pluginName, handlers);
        }
        return this;
    }

    @EventHandler
    public void onLoad(PluginEnableEvent enableEvent) {
        List<DependencyHandler> handlers = handlerMap.getOrDefault(enableEvent.getPlugin().getName(), new ArrayList<>());
        for (DependencyHandler handler : handlers) {
            OpenAudioLogger.info("Plugin " + enableEvent.getPlugin().getName() + " is now enabled, running handler");
            try {
                handler.onLoad(enableEvent.getPlugin().getName(), enableEvent.getPlugin());
            } catch (Exception e) {
                throw new RuntimeException("Failed to run handler for " + enableEvent.getPlugin().getName(), e);
            }
        }
    }

}
