package com.craftmend.openaudiomc.generic.database.internal;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.storm.Storm;
import com.craftmend.storm.api.StormModel;
import com.craftmend.storm.api.enums.Where;
import java.util.Collection;

public class Repository<T extends DataStore> {
    private Storm storm;
    private Class<? extends DataStore> type;

    public void onCreate(DatabaseService databaseService, Storm storm, Class<? extends DataStore> dataClass) {
        try {
            this.storm = storm;
            this.type = dataClass;
            storm.registerModel(dataClass.getConstructor().newInstance());
            storm.runMigrations();
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }

    public Collection<T> values() {
        try {
            return (Collection<T>) storm.buildQuery(type).execute().join();
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }

    public int count() {
        try {
            return storm.count(type).join();
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
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

    public void save(T data) {
        try {
            // try to save it first
            try {
                storm.save(data);
            } catch (Exception e) {
                OpenAudioLogger.warn("Failed to save a model. Trying again later (" + data.getClass().getSimpleName() + ")");
                // try again in a second, if it failed again, log it as an error
                TaskService ts = OpenAudioMc.resolveDependency(TaskService.class);
                ts.schduleSyncDelayedTask(() -> {
                    ts.runAsync(() -> {
                        try {
                            storm.save(data);
                        } catch (Exception e1) {
                            OpenAudioLogger.warn("Failed to save a model. This is a error. (" + data.getClass().getSimpleName() + ") (" + e.getClass().getSimpleName() + "/" + e1.getMessage() + ")");
                        }
                    });
                }, 20 * 5);
            }
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }

    public void saveUnsafe(Object data) {
        try {
            storm.save((StormModel) data);
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }

    public void delete(StormModel key) {
        try {
            storm.delete(key);
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }
}
