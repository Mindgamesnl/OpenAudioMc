package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.ChatColor;

public class SpigotRegionDetail implements StateDetail {
    @Override
    public String title() {
        return "Loaded Regions";
    }

    @Override
    public String value() {
        if (OpenAudioMcSpigot.getInstance().getRegionModule() == null) {
            return Platform.makeColor("RED") + "Feature Disabled";
        } else {
            return "Loaded Audio Regions: " + ChatColor.AQUA + "" + OpenAudioMcSpigot.getInstance().getRegionModule().getRegionPropertiesMap().size();
        }
    }
}
