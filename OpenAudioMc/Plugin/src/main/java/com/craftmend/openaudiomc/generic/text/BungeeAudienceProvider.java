package com.craftmend.openaudiomc.generic.text;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import net.kyori.adventure.platform.bungeecord.BungeeAudiences;

/**
 * Kept apart from the server equivalent on purpose, see {@link SpigotAudiences}.
 */
public final class BungeeAudienceProvider {

    private static BungeeAudiences audiences;

    private BungeeAudienceProvider() {
    }

    public static synchronized BungeeAudiences get() {
        if (audiences == null) {
            audiences = BungeeAudiences.create(OpenAudioMcBungee.getInstance());
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
