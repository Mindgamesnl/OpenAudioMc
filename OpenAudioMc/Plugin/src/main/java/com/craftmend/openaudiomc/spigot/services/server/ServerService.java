package com.craftmend.openaudiomc.spigot.services.server;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.rest.ServerEnvironment;
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

        // test skip
        if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.TESTING) {
            version = ServerVersion.MODERN;
            return;
        }

        String[] packageParts = Bukkit.getServer().getClass().getPackage().getName().replace(".", ",").split(",");
        if (packageParts.length < 4) {
            // paper removed package versioning, so we can't detect it, but it's modern
            version = ServerVersion.MODERN;
            return;
        }

        String versionString = packageParts[3].replace("v", "");
        versionString = versionString.replace("1_", "").replaceAll("_R\\d", "").replaceAll("[^\\d.]", "");
        int subVersion = Integer.parseInt(versionString);

        if (subVersion <= 12) {
            version = ServerVersion.LEGACY;
        } else {
            version = ServerVersion.MODERN;
        }

        OpenAudioLogger.info("Detected version type: " + version);
    }
}
