package com.craftmend.openaudiomc.spigot.modules.shortner;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.shortner.middleware.AliasMiddleware;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

public class AliasService extends Service {

    @Inject
    private OpenAudioMcSpigot spigot;

    @Getter private Map<String, String> aliasMap = new HashMap<>();

    public String translate(String name) {
        String target = aliasMap.get(name.toLowerCase());
        if (target == null) {
            OpenAudioLogger.toConsole("Warning! The alias '" + name + "' was used but doesn't have a source attached to it");
        }
        return target;
    }

    @Override
    public void onEnable() {
        OpenAudioLogger.toConsole("Loading aliases...");
        OpenAudioMc.getService(MediaService.class).registerMutation("a:", new AliasMiddleware(this));

        Configuration config = OpenAudioMc.getInstance().getConfiguration();

        //load config
        for (String alias : config.getStringSet("aliases", StorageLocation.DATA_FILE)) {
            // before we actually add it, we should check if the WG region still exists, to lesser load
            aliasMap.put(alias, config.getStringFromPath("aliases." + alias, StorageLocation.DATA_FILE));
        }

        OpenAudioLogger.toConsole("Loaded " + aliasMap.size() + " aliases");
    }
}
