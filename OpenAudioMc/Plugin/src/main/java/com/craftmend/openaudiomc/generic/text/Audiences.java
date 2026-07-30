package com.craftmend.openaudiomc.generic.text;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import net.kyori.adventure.platform.bukkit.BukkitAudiences;
import net.kyori.adventure.platform.bungeecord.BungeeAudiences;

public final class Audiences {

    private static BukkitAudiences bukkit;
    private static BungeeAudiences bungee;

    private Audiences() {
    }

    public static synchronized BukkitAudiences bukkit() {
        if (bukkit == null) {
            bukkit = BukkitAudiences.create(OpenAudioMcSpigot.getInstance());
        }
        return bukkit;
    }

    public static synchronized BungeeAudiences bungee() {
        if (bungee == null) {
            bungee = BungeeAudiences.create(OpenAudioMcBungee.getInstance());
        }
        return bungee;
    }

    public static synchronized void close() {
        if (bukkit != null) {
            bukkit.close();
            bukkit = null;
        }
        if (bungee != null) {
            bungee.close();
            bungee = null;
        }
    }

}
