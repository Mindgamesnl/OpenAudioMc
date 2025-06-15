package com.craftmend.openaudiomc.spigot.modules.configuration;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.apache.commons.lang.Validate;
import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.world.WorldSaveEvent;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class SpigotConfiguration implements Configuration, Listener {

    private FileConfiguration mainConfig;
    private FileConfiguration dataConfig;

    private final Map<StorageKey, String> cachedConfigStrings = new ConcurrentHashMap<>();

    public SpigotConfiguration(OpenAudioMcSpigot openAudioMcSpigot) {
        //save default
        if (!hasDataFile()) openAudioMcSpigot.saveResource("data.yml", false);
        openAudioMcSpigot.registerEvents(this);

        dataConfig = YamlConfiguration.loadConfiguration(new File(OpenAudioMcSpigot.getInstance().getDataFolder(), "data.yml"));

        loadConfig(openAudioMcSpigot);

        OpenAudioLogger.info("Starting configuration module");
        this.loadSettings();
    }

    public void loadConfig(OpenAudioMcSpigot openAudioMcSpigot) {
        OpenAudioLogger.info("Using the main config file..");
        openAudioMcSpigot.saveDefaultConfig();
        mainConfig = openAudioMcSpigot.getConfig();
    }

    @EventHandler
    public void onWorldSave(WorldSaveEvent event) {
        saveAll(false);
    }

    public Configuration loadSettings() {
        // deprecated
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
                return cachedConfigStrings.computeIfAbsent(storageKey, v ->
                        ((mainConfig.getString(storageKey.getPath()) == null ? "<unknown openaudiomc value " + storageKey.getPath() + ">" : mainConfig.getString(storageKey.getPath()))));

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
        return value == null ? "<unknown openaudiomc value " + path + ">" : value;
    }

    @Override
    public boolean isPathValid(String path, StorageLocation storageLocation) {
        switch (storageLocation) {
            case DATA_FILE:
                return dataConfig.contains(path, true);

            case CONFIG_FILE:
                return mainConfig.contains(path, true);

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
        Validate.isTrue(storageLocation == StorageLocation.DATA_FILE, "Getting sets from a config file with hardcoded paths is not allowed");
        ConfigurationSection section = dataConfig.getConfigurationSection(path);
        if (section == null) return new HashSet<>();
        return section.getKeys(false);
    }

    @Override
    public List<Map<String, Object>> getObjectList(String path, StorageLocation storageLocation) {
        FileConfiguration t = storageLocation == StorageLocation.DATA_FILE ? dataConfig : mainConfig;
        List<Map<?, ?>> list = t.getMapList(path);
        List<Map<String, Object>> values = new ArrayList<>();
        for (Map<?, ?> map : list) {
            Map<String, Object> newMap = new HashMap<>();
            for (Map.Entry<?, ?> entry : map.entrySet()) {
                newMap.put(entry.getKey().toString(), entry.getValue());
            }
            values.add(newMap);
        }
        return values;
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
        OpenAudioMcSpigot.getInstance().reloadConfig();
        mainConfig = OpenAudioMcSpigot.getInstance().getConfig();
        dataConfig = YamlConfiguration.loadConfiguration(new File(OpenAudioMcSpigot.getInstance().getDataFolder(), "data.yml"));
        this.loadSettings();
    }

    /**
     * saves the data to the file, like new regions and speakers.
     */
    @Override
    public void saveAll(boolean includeConfig) {
        try {
            if (includeConfig) {
                mainConfig.save(new File(OpenAudioMcSpigot.getInstance().getDataFolder(), "config.yml"));
            }
            dataConfig.save("plugins"+ File.separator + "OpenAudioMc" + File.separator + "data.yml");
        } catch (IOException e) {
            OpenAudioLogger.error(e, "Failed to save config/data");
        }
    }

    @Override
    public void overwriteConfigFile() {
        OpenAudioMcSpigot.getInstance().saveResource("config.yml", true);
    }

    @Override
    public boolean hasDataFile() {
        File dataFile = new File("plugins" + File.separator + "OpenAudioMc" + File.separator + "data.yml");
        return dataFile.exists();
    }

    @Override
    public boolean hasStorageKey(StorageKey storageKey) {
        if (storageKey.getStorageLocation() == StorageLocation.DATA_FILE) {
            return dataConfig.isSet(storageKey.getPath());
        }
        return mainConfig.isSet(storageKey.getPath());
    }

}
