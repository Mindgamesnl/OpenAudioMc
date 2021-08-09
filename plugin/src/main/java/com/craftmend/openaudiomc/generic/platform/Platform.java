package com.craftmend.openaudiomc.generic.platform;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.velocity.utils.VelocityChatColor;

public enum Platform {

    SPIGOT,
    BUNGEE,
    VELOCITY,
    STANDALONE,
    ;

    public static String translateColors(String input) {
        switch (OpenAudioMc.getInstance().getPlatform()){
            case SPIGOT:
                return org.bukkit.ChatColor.translateAlternateColorCodes('&', input);
            case BUNGEE:
                return net.md_5.bungee.api.ChatColor.translateAlternateColorCodes('&', input);
            case VELOCITY:
                return VelocityChatColor.translateAlternateColorCodes('&', input);
            default:
                return null; // unknown platform
        }

    }

    public static String makeColor(String color) {
        switch (OpenAudioMc.getInstance().getPlatform()){
            case SPIGOT:
                return org.bukkit.ChatColor.valueOf(color).toString();
            case BUNGEE:
                return net.md_5.bungee.api.ChatColor.valueOf(color).toString();
            case VELOCITY:
                return VelocityChatColor.valueOf(color).toString();
            default:
                return null; // unknown platform
        }
    }

}
