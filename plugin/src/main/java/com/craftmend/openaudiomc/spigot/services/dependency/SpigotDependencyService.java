package com.craftmend.openaudiomc.spigot.services.dependency;

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
            handler.onLoad(pluginName, Bukkit.getPluginManager().getPlugin(pluginName));
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
            handler.onLoad(enableEvent.getPlugin().getName(), enableEvent.getPlugin());
        }
    }

}
