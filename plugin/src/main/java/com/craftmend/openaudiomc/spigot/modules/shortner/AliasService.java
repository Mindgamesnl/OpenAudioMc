package com.craftmend.openaudiomc.spigot.modules.shortner;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias;
import com.craftmend.openaudiomc.spigot.modules.shortner.middleware.AliasMiddleware;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

public class AliasService extends Service {

    @Inject
    private OpenAudioMcSpigot spigot;

    @Inject
    private DatabaseService databaseService;

    @Getter private Map<String, Alias> aliasMap = new HashMap<>();

    public String translate(String name) {
        Alias target = aliasMap.get(name.toLowerCase());
        if (target == null) {
            OpenAudioLogger.toConsole("Warning! The alias '" + name + "' was used but doesn't have a source attached to it");
            return name;
        }
        return target.getTarget();
    }

    @Override
    public void onEnable() {
        OpenAudioLogger.toConsole("Loading aliases...");
        OpenAudioMc.getService(MediaService.class).registerMutation("a:", new AliasMiddleware(this));

        //load config
        for (Alias alias : databaseService.getTable(Alias.class).values()) {
            aliasMap.put(alias.getName(), alias);
        }

        OpenAudioLogger.toConsole("Loaded " + aliasMap.size() + " aliases");
    }
}
