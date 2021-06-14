package com.craftmend.openaudiomc.bungee.modules.dependency;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.plugin.Listener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DependencyService implements Listener {

    private final Map<String, List<DependencyHandler>> handlerMap = new HashMap<>();

    public DependencyService(OpenAudioMcBungee bungee) {
        bungee.getProxy().getPluginManager().registerListener(bungee, this);
    }

    public DependencyService ifPluginEnabled(String pluginName, DependencyHandler handler) {
        if (ProxyServer.getInstance().getPluginManager().getPlugin(pluginName) != null) {
            handler.onLoad(pluginName, ProxyServer.getInstance().getPluginManager().getPlugin(pluginName));
        } else {
            List<DependencyHandler> handlers = handlerMap.getOrDefault(pluginName, new ArrayList<>());
            handlers.add(handler);
            handlerMap.put(pluginName, handlers);
        }
        return this;
    }

}
