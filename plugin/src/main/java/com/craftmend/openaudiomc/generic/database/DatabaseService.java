package com.craftmend.openaudiomc.generic.database;

import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.database.internal.StoredData;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;
import lombok.Getter;
import org.mapdb.DB;
import org.mapdb.thirdparty.com.craftmend.openaudiomc.jutils.JUtils;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

public class DatabaseService extends Service {

    private Map<Class<? extends StoredData>, Repository<? extends StoredData>> databaseMap = new HashMap<>();
    @Getter private DB database;

    public DatabaseService() {
        File storageDir = MagicValue.STORAGE_DIRECTORY.get(File.class);

        database = JUtils.getDbMaker()
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

    public <T extends StoredData> Repository<T> getTable(Class<T> dataClass) {
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
