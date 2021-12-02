package com.craftmend.openaudiomc.generic.database;

import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;
import lombok.Getter;
import org.mapdb.DB;
import org.mapdb.DBMaker;
import org.mapdb.thirdparty.com.craftmend.openaudiomc.jutils.JUtils;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

public class DatabaseService extends Service {

    private final Map<Class<? extends DataStore>, Repository<? extends DataStore>> databaseMap = new HashMap<>();
    @Getter private final DB database;

    public DatabaseService() {
        File storageDir = MagicValue.STORAGE_DIRECTORY.get(File.class);

        database = DBMaker
                .fileDB(new File(storageDir, "database.db"))
                .fileLockDisable()
                .fileMmapEnable()
                .checksumHeaderBypass()
                .transactionEnable()
                .closeOnJvmShutdown()
                .make();
    }

    public void shutdown() {
        OpenAudioLogger.toConsole("Closing database");
        database.commit();
        database.close();
        databaseMap.clear();

    }

    public <T extends DataStore> Repository<T> getRepository(Class<T> dataClass) {
        if (databaseMap.containsKey(dataClass)) {
            return (Repository<T>) databaseMap.get(dataClass);
        }

        // create database
        OpenAudioLogger.toConsole("Registering storage table for " + dataClass.getSimpleName());
        Repository<T> createdTable = new Repository<>();
        createdTable.onCreate(this, this.database, dataClass);
        databaseMap.put(dataClass, createdTable);
        return createdTable;
    }

}
