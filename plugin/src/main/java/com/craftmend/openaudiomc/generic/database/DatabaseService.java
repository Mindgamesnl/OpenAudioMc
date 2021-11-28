package com.craftmend.openaudiomc.generic.database;

import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;
import org.mapdb.DB;
import org.mapdb.DBMaker;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

public class DatabaseService extends Service {

    private Map<Class<? extends StoredData>, DataTable<? extends StoredData>> databaseMap = new HashMap<>();
    private DB database;

    public DatabaseService() {
        File storageDir = MagicValue.STORAGE_DIRECTORY.get(File.class);

        database = DBMaker
                .fileDB(new File(storageDir, "database.db"))
                .fileMmapEnable()
                .make();
    }

    public void shutdown() {
        OpenAudioLogger.toConsole("Closing database");
        database.close();
        databaseMap.clear();
    }

    public <T extends StoredData> DataTable<T> getTable(Class<T> dataClass) {
        if (databaseMap.containsKey(dataClass)) {
            return (DataTable<T>) databaseMap.get(dataClass);
        }

        // create database
        DataTable<T> createdTable = new DataTable<>();
        createdTable.onCreate(this, this.database, dataClass);
        databaseMap.put(dataClass, createdTable);
        return createdTable;
    }

}
