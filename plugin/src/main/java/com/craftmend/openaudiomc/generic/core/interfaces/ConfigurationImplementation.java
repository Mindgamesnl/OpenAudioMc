package com.craftmend.openaudiomc.generic.core.interfaces;

import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageLocation;

import java.util.Set;

public interface ConfigurationImplementation {

    ConfigurationImplementation loadSettings();
    String getString(StorageKey storageKey);
    int getInt(StorageKey storageKey);
    String getStringFromPath(String path, StorageLocation storageLocation);
    Integer getIntFromPath(String path, StorageLocation storageLocation);
    Set<String> getStringSet(String path, StorageLocation storageLocation);
    void setString(StorageKey storageKey, String string);
    void setString(StorageLocation storageLocation, String path, String string);
    void setInt(StorageLocation storageLocation, String path, int value);
    boolean getBoolean(StorageKey storageKey);
    Object get(StorageKey storageKey);
    void set(StorageKey storageKey, Object value);
    void reloadConfig();
    void saveAll();
    void saveAllhard();
    boolean hasDataFile();
    boolean hasStorageKey(StorageKey storageKey);

}
