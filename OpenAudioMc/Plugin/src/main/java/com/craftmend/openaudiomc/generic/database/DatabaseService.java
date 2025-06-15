package com.craftmend.openaudiomc.generic.database;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.OpenAudioMcBuild;
import com.craftmend.openaudiomc.generic.client.store.ClientDataStore;
import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.modules.ModuleLoaderService;
import com.craftmend.openaudiomc.generic.mojang.store.MojangProfile;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.modules.predictive.sorage.StoredWorldChunk;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.TimedRegionProperties;
import com.craftmend.openaudiomc.spigot.modules.rules.adapter.RuleTestTypeAdapter;
import com.craftmend.openaudiomc.spigot.modules.rules.adapter.RuleTypeAdapter;
import com.craftmend.openaudiomc.spigot.modules.rules.data.Rule;
import com.craftmend.openaudiomc.spigot.modules.rules.data.RuleTest;
import com.craftmend.openaudiomc.spigot.modules.rules.storage.MediaRule;
import com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.storm.Storm;
import com.craftmend.storm.StormOptions;
import com.craftmend.storm.connection.sqlite.SqliteFileDriver;
import com.craftmend.storm.logger.StormLogger;
import lombok.Getter;
import lombok.SneakyThrows;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DatabaseService extends Service implements StormLogger {

    private final Map<Class<? extends DataStore>, Repository<? extends DataStore>> databaseMap = new HashMap<>();

    @Getter private Storm storm;

    @SneakyThrows
    public DatabaseService() {
        File storageDir = MagicValue.STORAGE_DIRECTORY.get(File.class);

        StormOptions options = new StormOptions();
        options.setLogger(this);
        options.getTypeAdapters().put(Rule.class, new RuleTypeAdapter());
        options.getTypeAdapters().put(RuleTest.class, new RuleTestTypeAdapter());

        Class.forName("org.sqlite.JDBC");
        storm = new Storm(options, new SqliteFileDriver(new File(storageDir, "storm.db")));
        //storm.setGson(OpenAudioMc.getGson());

        // warmup tables
        List<Class<? extends DataStore>> tables = new ArrayList<>();
        tables.add(Alias.class);
        tables.add(ClientDataStore.class);
        tables.add(MojangProfile.class);
        tables.add(RegionProperties.class);
        tables.add(Speaker.class);
        tables.add(StoredWorldChunk.class);

        if (OpenAudioMcBuild.IS_TESTING || OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            log("Adding spigot tables");
            tables.add(TimedRegionProperties.class);
            tables.add(MediaRule.class);
        }


        for (Class<? extends DataStore> table : tables) {
            getRepository(table);
        }

        // migrate old data if there's a map.db
        if (new File(storageDir, "database.db").exists()) {
            OpenAudioLogger.warn("Found old legacy database! loading the temporary module to replace it.");
            getService(ModuleLoaderService.class).loadModFromFile(new File(storageDir, "modules/migrate.map-to-storm.jar"));
        }
    }

    public void shutdown() {
        OpenAudioLogger.info("Closing database");
        databaseMap.clear();
    }

    public <T extends DataStore> Repository<T> getRepository(Class<T> dataClass) {
        if (databaseMap.containsKey(dataClass)) {
            return (Repository<T>) databaseMap.get(dataClass);
        }

        // create database
        OpenAudioLogger.info("Registering storage table for " + dataClass.getSimpleName());
        Repository<T> createdTable = new Repository<>();
        createdTable.onCreate(this, this.storm, dataClass);
        databaseMap.put(dataClass, createdTable);
        return createdTable;
    }

    @Override
    public void warning(String s) {
        log(s);
    }

    @Override
    public void info(String s) {
        log(s);
    }
}
