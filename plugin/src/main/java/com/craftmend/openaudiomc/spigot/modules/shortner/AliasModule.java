package com.craftmend.openaudiomc.spigot.modules.shortner;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.shortner.middleware.AliasMiddleware;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

public class AliasModule {

    @Getter private Map<String, String> aliasMap = new HashMap<>();

    public AliasModule(OpenAudioMcSpigot openAudioMcSpigot) {
        OpenAudioLogger.toConsole("Loading aliases...");
        OpenAudioMc.getInstance().getMediaModule().registerMutation("a:", new AliasMiddleware(this));

        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();

        //load config
        for (String alias : config.getStringSet("aliases", StorageLocation.DATA_FILE)) {
            // before we actually add it, we should check if the WG region still exists, to lesser load
            aliasMap.put(alias, config.getStringFromPath("aliases." + alias, StorageLocation.DATA_FILE));
        }

        OpenAudioLogger.toConsole("Loaded " + aliasMap.size() + " aliases");
    }

    public String translate(String name) {
        String target = aliasMap.get(name.toLowerCase());
        if (target == null) {
            OpenAudioLogger.toConsole("Warning! The alias '" + name + "' was used but doesn't have a source attached to it");
        }
        return target;
    }

}
