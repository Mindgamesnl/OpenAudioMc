package com.craftmend.openaudiomc.bungee.modules.dependency;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.plugin.Listener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BungeeDependencyService extends Service implements Listener {

    @Inject
    private OpenAudioMcBungee bungee;

    private final Map<String, List<DependencyHandler>> handlerMap = new HashMap<>();

    public BungeeDependencyService() {
        bungee.getProxy().getPluginManager().registerListener(bungee, this);
    }

    public BungeeDependencyService ifPluginEnabled(String pluginName, DependencyHandler handler) {
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
