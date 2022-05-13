package com.craftmend.openaudiomc.generic.database.internal;

import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.storm.Storm;
import com.craftmend.storm.api.StormModel;
import com.craftmend.storm.api.enums.Where;
import lombok.SneakyThrows;

import java.util.Collection;

public class Repository<T extends DataStore> {

    private Storm storm;
    private Class<? extends DataStore> type;

    @SneakyThrows
    public void onCreate(DatabaseService databaseService, Storm storm, Class<? extends DataStore> dataClass) {
        this.storm = storm;
        this.type = dataClass;
        storm.registerModel(dataClass.getConstructor().newInstance());
        storm.runMigrations();
    }

    @SneakyThrows
    public Collection<T> values() {
        return (Collection<T>) storm.buildQuery(type).execute().join();
    }

    public T getWhere(String row, Object value) {
        try {
            return (T) storm.buildQuery(type).where(row, Where.EQUAL, value).execute().join().stream().findFirst().orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    public T castToCompatible(Object o) {
        return (T) o;
    }

    @SneakyThrows
    public void save(T data) {
        storm.save(data);
    }

    @SneakyThrows
    public void saveUnsafe(Object data) {
        storm.save((StormModel) data);
    }

    @SneakyThrows
    public void delete(StormModel key) {
        storm.delete(key);
    }
}
