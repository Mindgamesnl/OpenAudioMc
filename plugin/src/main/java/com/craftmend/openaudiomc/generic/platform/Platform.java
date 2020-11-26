package com.craftmend.openaudiomc.generic.platform;

import com.craftmend.openaudiomc.OpenAudioMc;

public enum Platform {

    SPIGOT,
    BUNGEE,
    VELOCITY,
    ;

    public static String translateColors(String input) {
        switch (OpenAudioMc.getInstance().getPlatform()){
            case SPIGOT:
                return org.bukkit.ChatColor.translateAlternateColorCodes('&', input);
            case BUNGEE:
                return net.md_5.bungee.api.ChatColor.translateAlternateColorCodes('&', input);
            case VELOCITY:
                return com.craftmend.openaudiomc.velocity.ChatColor.translateAlternateColorCodes('&', input);
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
                return com.craftmend.openaudiomc.velocity.ChatColor.valueOf(color).toString();
            default:
                return null; // unknown platform
        }
    }

}
