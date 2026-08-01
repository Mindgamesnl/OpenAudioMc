package com.craftmend.openaudiomc.generic.text;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import net.kyori.adventure.platform.bukkit.BukkitAudiences;

/**
 * Kept apart from the proxy equivalent on purpose. A class naming both platforms links both, and
 * verifying the proxy branch resolves net.md_5.bungee.api.plugin.Plugin, which is absent on a server.
 */
public final class SpigotAudiences {

    private static BukkitAudiences audiences;

    private SpigotAudiences() {
    }

    public static synchronized BukkitAudiences get() {
        if (audiences == null) {
            audiences = BukkitAudiences.create(OpenAudioMcSpigot.getInstance());
        }
        return audiences;
    }

    public static synchronized void close() {
        if (audiences != null) {
            audiences.close();
            audiences = null;
        }
    }

}
