package com.craftmend.openaudiomc.generic.platform;

import com.craftmend.openaudiomc.OpenAudioMc;
import org.bukkit.ChatColor;

public enum Platform {

    SPIGOT,
    BUNGEE;

    public static String translateColors(String input) {
        if (OpenAudioMc.getInstance().getPlatform() == SPIGOT) {
            return ChatColor.translateAlternateColorCodes('&', input);
        } else {
            return net.md_5.bungee.api.ChatColor.translateAlternateColorCodes('&', input);
        }
    }

}
