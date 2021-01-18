package com.craftmend.openaudiomc.spigot.services.server;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import lombok.Getter;
import org.bukkit.Bukkit;

public class ServerService {

    @Getter
    private ServerVersion version;

    public ServerService() {
        String versionString = Bukkit.getServer().getClass().getPackage().getName().replace(".", ",").split(",")[3].replace("v", "");;
        versionString = versionString.replace("1_", "").replaceAll("_R\\d", "").replaceAll("[^\\d.]", "");
        int subVersion = Integer.parseInt(versionString);

        if (subVersion <= 12) {
            version = ServerVersion.LEGACY;
        } else {
            version = ServerVersion.MODERN;
        }

        OpenAudioLogger.toConsole("Detected version type: " + version);
    }

}
