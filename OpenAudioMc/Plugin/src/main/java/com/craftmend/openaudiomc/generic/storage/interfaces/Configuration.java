package com.craftmend.openaudiomc.generic.storage.interfaces;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface Configuration {

    Configuration loadSettings();
    String getString(StorageKey storageKey);
    int getInt(StorageKey storageKey);
    String getStringFromPath(String path, StorageLocation storageLocation);
    boolean isPathValid(String path, StorageLocation storageLocation);
    Integer getIntFromPath(String path, StorageLocation storageLocation);
    Set<String> getStringSet(String path, StorageLocation storageLocation);
    List<Map<String, Object>> getObjectList(String path, StorageLocation storageLocation);
    void setString(StorageKey storageKey, String string);
    void setString(StorageLocation storageLocation, String path, String string);
    void setBoolean(StorageKey location, boolean value);
    void setInt(StorageLocation storageLocation, String path, int value);
    boolean getBoolean(StorageKey storageKey);
    Object get(StorageKey storageKey);
    void set(StorageKey storageKey, Object value);
    void reloadConfig();
    void saveAll(boolean alsoSaveConfig);
    void overwriteConfigFile();
    boolean hasDataFile();
    boolean hasStorageKey(StorageKey storageKey);

    default void warnIfWrongFilePermissions(File file) {
        if (file.exists() && !file.canRead()) {
            OpenAudioLogger.warn("======= FATAL CONFIG ERROR =======");
            OpenAudioLogger.warn("The file " + file.getAbsolutePath() + " is not readable. Please check the file permissions.");
            OpenAudioLogger.warn("======= FATAL CONFIG ERROR =======");
        }
        if (file.exists() && !file.canWrite()) {
            OpenAudioLogger.warn("======= FATAL CONFIG ERROR =======");
            OpenAudioLogger.warn("The file " + file.getAbsolutePath() + " is not writable. Please check the file permissions.");
            OpenAudioLogger.warn("======= FATAL CONFIG ERROR =======");
        }
    }

}
