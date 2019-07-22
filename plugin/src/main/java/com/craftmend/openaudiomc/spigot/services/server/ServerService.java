package com.craftmend.openaudiomc.spigot.services.server;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.Material;

public class ServerService {

    @Getter private ServerVersion version;

    public ServerService() {
        String versionClassPath = Bukkit.getServer().getClass().getPackage().getName();
        Boolean isModernMinecraft = (versionClassPath.contains("1.13") || versionClassPath.contains("1.14"));
        version = isModernMinecraft ? ServerVersion.MODERN : ServerVersion.LEGACY;

        // do checks to validate
        if (isModernMinecraft) {
            try {
                Material testCase = Material.PLAYER_HEAD;
            } catch (Exception e) {
                // modern material not found, defaulting back
                version = ServerVersion.LEGACY;
            }
            try {
                Material testCase = Material.valueOf("LEGACY_SKULL_ITEM");
            } catch (Exception e) {
                // modern material not found, defaulting back
                version = ServerVersion.LEGACY;
            }
        } else {
            try {
                Material testCase = Material.valueOf("SKULL_ITEM");
            } catch (Exception e) {
                // modern material not found, defaulting back
                version = ServerVersion.MODERN;
            }
        }

        System.out.println(OpenAudioMcSpigot.getLOG_PREFIX() + "Detected version type: " + version);
    }

}
