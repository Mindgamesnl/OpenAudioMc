package com.craftmend.openaudiomc.generic.database.internal;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.google.gson.reflect.TypeToken;
import org.mapdb.DB;
import org.mapdb.Serializer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentMap;

public class DataTable<T> {

    private DatabaseService databaseService;
    private ConcurrentMap<String, String> dataMap;
    private Class<? extends StoredData> type;

    public void onCreate(DatabaseService databaseService, DB database, Class<? extends StoredData> dataClass) {
        this.databaseService = databaseService;
        this.type = dataClass;
        this.dataMap = database
                .hashMap(dataClass.getSimpleName(), Serializer.STRING, Serializer.STRING)
                .createOrOpen();
    }

    private T deserialize(String input) {
        return OpenAudioMc.getGson().fromJson(input, TypeToken.get(this.type).getType());
    }

    public Collection<T> values() {
        List<T> values = new ArrayList<>();
        for (String value : dataMap.values()) {
            values.add(deserialize(value));
        }
        return values;
    }

    public int size() {
        return dataMap.size();
    }

    public T get(String key) {
        String data = this.dataMap.get(key);
        if (data == null) return null;
        return deserialize(data);
    }

    public void save(String key, T data) {
        dataMap.put(key, OpenAudioMc.getGson().toJson(data));
        databaseService.getDatabase().commit();
    }

    public boolean containsKey(String key) {
        return dataMap.containsKey(key);
    }

    public void delete(String key) {
        dataMap.remove(key);
        databaseService.getDatabase().commit();
    }
}
