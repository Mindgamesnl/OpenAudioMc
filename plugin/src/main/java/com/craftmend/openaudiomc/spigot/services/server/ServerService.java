package com.craftmend.openaudiomc.spigot.services.server;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.Material;

public class ServerService {

    @Getter
    private ServerVersion version;

    public ServerService() {
        String versionString = Bukkit.getServer().getClass().getPackage().getName().replace(".", ",").split(",")[3];
        int subVersion = Integer.parseInt(versionString.replace("1_", "").replaceAll("_R\\d", ""));

        if (subVersion <= 12) {
            version = ServerVersion.LEGACY;
        } else {
            version = ServerVersion.MODERN;
        }

        OpenAudioLogger.toConsole("Detected version type: " + version);
    }

}
