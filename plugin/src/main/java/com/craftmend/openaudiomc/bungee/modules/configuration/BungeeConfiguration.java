package com.craftmend.openaudiomc.bungee.modules.configuration;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import net.md_5.bungee.config.ConfigurationProvider;
import net.md_5.bungee.config.YamlConfiguration;
import org.apache.commons.lang.Validate;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * A bungeecord implementation of the OpenAudioMc file standard
 *
 * This generates and maintains the data.yml and config.yml
 */
public class BungeeConfiguration implements Configuration {

    private net.md_5.bungee.config.Configuration mainConfig;
    private final net.md_5.bungee.config.Configuration dataConfig;

    private final Map<StorageKey, String> cachedConfigStrings = new ConcurrentHashMap<>();

    public BungeeConfiguration() {
        //save default
        saveDefaultFile("data.yml", false);
        saveDefaultFile("config.yml", false);

        dataConfig = getFile("data.yml");
        mainConfig = getFile("config.yml");

        OpenAudioLogger.info("Starting configuration module");
        this.loadSettings();
    }

    public Configuration loadSettings() {
        // deperecated
        return this;
    }

    /**
     * get a specific string from a config
     * @param storageKey The storage key
     * @return the string
     */
    @Override
    public String getString(StorageKey storageKey) {
        switch (storageKey.getStorageLocation()) {
            case DATA_FILE:
                return dataConfig.getString(storageKey.getPath());

            case CONFIG_FILE:
                return ((mainConfig.getString(storageKey.getPath()) == null ? "<unknown openaudiomc value " + storageKey.getPath() + ">" : mainConfig.getString(storageKey.getPath())));

            default:
                return "<unknown openaudiomc value " + storageKey.getPath() + ">";
        }
    }

    /**
     * get a specific int from a config
     * @param storageKey The storage key
     * @return the int, -1 if absent
     */
    @Override
    public int getInt(StorageKey storageKey) {
        switch (storageKey.getStorageLocation()) {
            case DATA_FILE:
                return dataConfig.getInt(storageKey.getPath());

            case CONFIG_FILE:
                return mainConfig.getInt(storageKey.getPath());

            default:
                return -1;
        }
    }

    /**
     * A safe string getter
     * @param path The path
     * @param storageLocation specified file
     * @return the string, or a empty string instead of null
     */
    @Override
    public String getStringFromPath(String path, StorageLocation storageLocation) {
        Validate.isTrue(storageLocation == StorageLocation.DATA_FILE, "Getting strings from a config file with hardcoded paths is not allowed");
        String value = dataConfig.getString(path);
        return value == null ? "" : value;
    }

    @Override
    public boolean isPathValid(String path, StorageLocation storageLocation) {
        switch (storageLocation) {
            case DATA_FILE:
                return dataConfig.contains(path);

            case CONFIG_FILE:
                return mainConfig.contains(path);

            default:
                return false;
        }
    }

    /**
     * A safe int getter
     * @param path The path
     * @param storageLocation specified file
     * @return the int value
     */
    @Override
    public Integer getIntFromPath(String path, StorageLocation storageLocation) {
        Validate.isTrue(storageLocation == StorageLocation.DATA_FILE, "Getting strings from a config file with hardcoded paths is not allowed");
        return dataConfig.getInt(path);
    }

    /**
     * get a set of keys under a config section, will never be null so its safe
     * @param path Path
     * @param storageLocation file target
     * @return a set of keys, can be empty
     */
    @Override
    public Set<String> getStringSet(String path, StorageLocation storageLocation) {
        throw new UnsupportedOperationException("Not supported in bungeecord mode");
    }

    @Override
    public List<Map<String, Object>> getObjectList(String path, StorageLocation storageLocation) {
        net.md_5.bungee.config.Configuration config = storageLocation == StorageLocation.DATA_FILE ? dataConfig : mainConfig;
        List<?> list = config.getList(path);
        return (List<Map<String, Object>>) list;
    }

    /**
     * Write/update a string value for a file
     * @param storageKey The storage key
     * @param string the new value
     */
    @Override
    public void setString(StorageKey storageKey, String string) {
        switch (storageKey.getStorageLocation()) {
            case DATA_FILE:
                dataConfig.set(storageKey.getPath(), string);
                return;

            case CONFIG_FILE:
                mainConfig.set(storageKey.getPath(), string);
                cachedConfigStrings.put(storageKey, string);
                return;
        }
    }

    /**
     * write a soft value to a file
     * @param storageLocation The file to save to
     * @param path the path
     * @param string the value
     */
    @Override
    public void setString(StorageLocation storageLocation, String path, String string) {
        switch (storageLocation) {
            case DATA_FILE:
                dataConfig.set(path, string);
                return;

            case CONFIG_FILE:
                mainConfig.set(path, string);
                return;
        }
    }

    /**
     * write a soft value to a file
     * @param storageLocation The file to save to
     * @param path the path
     * @param value the value
     */
    @Override
    public void setInt(StorageLocation storageLocation, String path, int value) {
        switch (storageLocation) {
            case DATA_FILE:
                dataConfig.set(path, value);
                return;

            case CONFIG_FILE:
                mainConfig.set(path, value);
                return;
        }
    }

    /**
     * Get a boolean value, from any file
     * @param storageKey The storage key
     * @return boolean value
     */
    @Override
    public boolean getBoolean(StorageKey storageKey) {
        switch (storageKey.getStorageLocation()) {
            case DATA_FILE:
                return dataConfig.getBoolean(storageKey.getPath());

            case CONFIG_FILE:
                return mainConfig.getBoolean(storageKey.getPath());

            default:
                return false;
        }
    }

    @Override
    public Object get(StorageKey storageKey) {
        switch (storageKey.getStorageLocation()) {
            case DATA_FILE:
                return dataConfig.get(storageKey.getPath());

            case CONFIG_FILE:
                return mainConfig.get(storageKey.getPath());

            default:
                return false;
        }
    }

    @Override
    public void set(StorageKey storageKey, Object value) {
        switch (storageKey.getStorageLocation()) {
            case DATA_FILE:
                dataConfig.set(storageKey.getPath(), value);
                return;

            case CONFIG_FILE:
                mainConfig.set(storageKey.getPath(), value);
                return;
        }
    }

    /**
     * Reload the config file
     */
    @Override
    public void reloadConfig() {
        this.cachedConfigStrings.clear();
        mainConfig = getFile("config.yml");
        this.loadSettings();
    }

    /**
     * saves the data to the file, like new regions and speakers.
     */
    @Override
    public void saveAll(boolean includeConfig) {
        try {
            if (includeConfig) {
                ConfigurationProvider.getProvider(YamlConfiguration.class).save(mainConfig, new File(OpenAudioMcBungee.getInstance().getDataFolder(), "config.yml"));
            }
            ConfigurationProvider.getProvider(YamlConfiguration.class).save(dataConfig, new File(OpenAudioMcBungee.getInstance().getDataFolder(), "data.yml"));
        } catch (IOException e) {
            OpenAudioLogger.error(e, "Failed to save config/data");
        }
    }

    @Override
    public void overwriteConfigFile() {
        saveDefaultFile("config.yml", true);
    }

    @Override
    public boolean hasDataFile() {
        return true;
    }

    @Override
    public boolean hasStorageKey(StorageKey storageKey) {
        if (storageKey.getStorageLocation() == StorageLocation.DATA_FILE) {
            return dataConfig.contains(storageKey.getPath());
        }
        return mainConfig.contains(storageKey.getPath());
    }

    private net.md_5.bungee.config.Configuration getFile(String filename) {
        net.md_5.bungee.config.Configuration load = null;
        try {
            load = ConfigurationProvider.getProvider(YamlConfiguration.class).load(new File(OpenAudioMcBungee.getInstance().getDataFolder(), filename));
        } catch (IOException e) {
            OpenAudioLogger.error(e, "Could not load file: " + filename);
        }
        return load;
    }

    private void saveDefaultFile(String filename, boolean hard) {
        if (!OpenAudioMcBungee.getInstance().getDataFolder().exists())
            OpenAudioMcBungee.getInstance().getDataFolder().mkdir();

        File file = new File(OpenAudioMcBungee.getInstance().getDataFolder(), filename);

        if (hard && file.exists()) {
            try {
                Files.delete(file.toPath());
            } catch (IOException e) {
                OpenAudioLogger.error(e, "Could not delete file: " + filename);
            }
        }

        if (!file.exists() || hard) {
            try (InputStream in = OpenAudioMcBungee.getInstance().getResourceAsStream(filename)) {
                Files.copy(in, file.toPath());
            } catch (IOException e) {
                OpenAudioLogger.error(e, "Could not save default file: " + filename);
            }
        }
    }

    @Override
    public void setBoolean(StorageKey location, boolean value) {
        switch (location.getStorageLocation()) {
            case DATA_FILE:
                dataConfig.set(location.getPath(), value);
                return;

            case CONFIG_FILE:
                mainConfig.set(location.getPath(), value);
                return;
        }
    }

}
