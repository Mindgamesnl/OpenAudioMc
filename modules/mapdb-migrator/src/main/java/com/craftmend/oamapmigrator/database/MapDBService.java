package com.craftmend.oamapmigrator.database;

import com.craftmend.oamapmigrator.database.internal.LegacyStore;
import com.craftmend.oamapmigrator.database.internal.Repository;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;
import lombok.Getter;
import org.mapdb.DB;
import org.mapdb.DBMaker;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Deprecated
public class MapDBService extends Service {

    private final Map<Class<? extends LegacyStore>, Repository<? extends LegacyStore>> databaseMap = new HashMap<>();
    @Getter private final DB database;

    public MapDBService() {
        File storageDir = MagicValue.STORAGE_DIRECTORY.get(File.class);

        database = DBMaker
                .fileDB(new File(storageDir, "database.db"))
                .fileLockDisable()
                .fileMmapEnable()
                .checksumHeaderBypass()
                .transactionEnable()
                .closeOnJvmShutdownWeakReference()
                .make();
    }

    public void shutdown() {
        OpenAudioLogger.info("Closing database");
        database.commit();
        database.close();
        databaseMap.clear();

    }

    public <T extends LegacyStore> Repository<T> getRepository(Class<T> dataClass) {
        if (databaseMap.containsKey(dataClass)) {
            return (Repository<T>) databaseMap.get(dataClass);
        }

        // create database
        OpenAudioLogger.info("Registering storage table for " + dataClass.getSimpleName());
        Repository<T> createdTable = new Repository<>();
        createdTable.onCreate(this, this.database, dataClass);
        databaseMap.put(dataClass, createdTable);
        return createdTable;
    }

}
