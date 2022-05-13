package com.craftmend.oamapmigrator;

import com.craftmend.oamapmigrator.database.MapDBService;
import com.craftmend.oamapmigrator.database.internal.LegacyStore;
import com.craftmend.oamapmigrator.database.models.*;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public final class OaMapmigrator extends ExternalModule {

    private Map<Class<? extends LegacyStore>, Class<? extends com.craftmend.openaudiomc.generic.database.internal.DataStore>> models = new HashMap<>();
    private Map<String, String> fieldRenames = new HashMap<>();
    private MapDBService mapDBService;

    public OaMapmigrator() {
        models.put(Alias.class, com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias.class);
        models.put(RegionProperties.class, com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties.class);
        models.put(Speaker.class, com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker.class);
        models.put(StoredWorldChunk.class, com.craftmend.openaudiomc.spigot.modules.predictive.sorage.StoredWorldChunk.class);

        fieldRenames.put("Speaker.id", "speakerId");
    }

    @Override
    public String getName() {
        return "MapDB Migrator";
    }

    @Override
    public String getDescription() {
        return "Migrate legacy MAPDB to the new storm based system";
    }

    @Override
    public void onInitialize() {

    }

    @Override
    public void on(ModuleEvent event) {
        if (mapDBService == null) {
            OpenAudioMc.getInstance().getServiceManager().loadServices(MapDBService.class);
            mapDBService = OpenAudioMc.getService(MapDBService.class);
        }
        log("Handling " + event);

        switch (event) {
            case SERVICES_LOADED:
                migrateAll();
                break;
        }

    }

    private void migrateAll() {
        models.forEach((old, modern) -> {
            log("Migrating " + old.getSimpleName());
            try {
                for (LegacyStore value : mapDBService.getRepository(old).values()) {
                    com.craftmend.openaudiomc.generic.database.internal.DataStore emptyNew = modern.getConstructor().newInstance();
                    com.craftmend.openaudiomc.generic.database.internal.DataStore modernStoreFilled = (com.craftmend.openaudiomc.generic.database.internal.DataStore) copyOnto(old, value, emptyNew);

                    // now, save with the new system
                    Repository<?> r = OpenAudioMc.getService(DatabaseService.class).getRepository(modern);
                    r.saveUnsafe(r.castToCompatible(
                            modernStoreFilled
                    ));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        mapDBService.shutdown();
    }

    private void log(String s) {
        OpenAudioLogger.toConsole("mapdbmigrate.jar: " + s);
    }

    public Object copyOnto(Class original, Object source, Object target) throws Exception {
        for (Field declaredField : original.getDeclaredFields()) {
            declaredField.setAccessible(true);
            Field targetField = target.getClass().getDeclaredField(
                    fieldRenames.getOrDefault(
                            original.getSimpleName() + "." + declaredField.getName(),
                            declaredField.getName()
                    )
            );
            targetField.setAccessible(true);
            targetField.set(target, declaredField.get(source));
        }
        return target;
    }

}
