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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AliasService extends Service {

    @Inject
    private OpenAudioMcSpigot spigot;

    @Inject
    private DatabaseService databaseService;

    @Getter private final Map<String, Alias> aliasMap = new HashMap<>();

    public String translate(String name) {
        Alias target = aliasMap.get(name.toLowerCase());
        if (target == null) {
            OpenAudioLogger.warn("The alias '" + name + "' was used but doesn't have a source attached to it");
            return name;
        }
        return target.getTarget();
    }

    @Override
    public void onEnable() {
        OpenAudioLogger.info("Loading aliases...");
        OpenAudioMc.getService(MediaService.class).registerMutation("a:", new AliasMiddleware(this));

        //load config
        Map<String, Alias> aliasWeight = new HashMap<>();
        List<Alias> deletable = new ArrayList<>();
        for (Alias dbAlias : OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class).values()) {

            // check if we already have this region
            if (aliasMap.containsKey(dbAlias.getName()) && aliasWeight.containsKey(dbAlias.getName())) {
                Alias other = aliasWeight.get(dbAlias.getName());
                if (other.getId() < dbAlias.getId()) {
                    deletable.add(other);
                }

                // i may be older as well, could also be
                if (other.getId() > dbAlias.getId()) {
                    deletable.add(dbAlias);
                    continue;
                }
            }


            aliasWeight.put(dbAlias.getName(), dbAlias);
            aliasMap.put(dbAlias.getName(), dbAlias);
        }

        for (Alias removeable : deletable) {
            OpenAudioMc.getService(DatabaseService.class).getRepository(Alias.class).delete(removeable);
        }

        OpenAudioLogger.info("Loaded " + aliasMap.size() + " aliases");
    }
}
