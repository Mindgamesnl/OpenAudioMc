package com.craftmend.openaudiomc.generic.platform;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;
import com.craftmend.openaudiomc.generic.commands.selectors.SelectorTranslator;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import com.craftmend.openaudiomc.velocity.modules.player.objects.VelocityPlayerSelector;
import com.craftmend.openaudiomc.velocity.utils.VelocityChatColor;

public enum Platform {

    UNKNOWN,
    SPIGOT,
    BUNGEE,
    VELOCITY,
    STANDALONE,
    ;

    public static String translateColors(String input) {
        switch (OpenAudioMc.getInstance().getPlatform()) {
            case SPIGOT:
                return org.bukkit.ChatColor.translateAlternateColorCodes('&', input);
            case BUNGEE:
                return net.md_5.bungee.api.ChatColor.translateAlternateColorCodes('&', input);
            case VELOCITY:
                return VelocityChatColor.translateAlternateColorCodes('&', input);
            default:
                return input; // unknown platform
        }
    }

    public static SelectorTranslator<?> getSelectorTranslator() {
        switch (OpenAudioMc.getInstance().getPlatform()){
            case SPIGOT:
                return new SpigotPlayerSelector();
            case BUNGEE:
                return new BungeePlayerSelector();
            case VELOCITY:
                return new VelocityPlayerSelector();
            default:
                return new FallbackPlayerSelector();
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
                return ""; // unknown platform
        }
    }

}
