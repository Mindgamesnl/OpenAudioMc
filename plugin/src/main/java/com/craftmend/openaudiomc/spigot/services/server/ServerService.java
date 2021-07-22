package com.craftmend.openaudiomc.spigot.services.server;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.Bukkit;

@NoArgsConstructor
public class ServerService extends Service {

    @Getter
    private ServerVersion version;

    @Override
    public void onEnable() {
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
