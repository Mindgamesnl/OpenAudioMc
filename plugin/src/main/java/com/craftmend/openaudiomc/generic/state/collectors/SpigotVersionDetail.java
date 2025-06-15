package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.version.MinecraftVersion;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import org.bukkit.Bukkit;

public class SpigotVersionDetail implements StateDetail {

    @Override
    public String title() {
        return "Detected Spigot Version";
    }

    @Override
    public String value() {
        return MinecraftVersion.getCurrent().name() + " (" + Bukkit.getVersion() + ")";
    }

}
