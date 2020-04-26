package com.craftmend.openaudiomc.spigot.modules.configuration;

import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.core.storage.objects.ClientSettings;
import lombok.Getter;
import org.apache.commons.lang.Validate;
import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class SpigotConfigurationImplementation implements ConfigurationImplementation {

    @Getter private ClientSettings clientSettings;
    private FileConfiguration mainConfig;
    private FileConfiguration dataConfig;

    private Map<StorageKey, String> cachedConfigStrings = new HashMap<>();

    public SpigotConfigurationImplementation(OpenAudioMcSpigot openAudioMcSpigot) {
        //save default
        openAudioMcSpigot.saveDefaultConfig();
        if (!hasDataFile()) openAudioMcSpigot.saveResource("data.yml", false);

        dataConfig = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudioMc/data.yml"));
        mainConfig = openAudioMcSpigot.getConfig();

        OpenAudioLogger.toConsole("Starting configuration module");
        this.loadSettings();
    }

    public ConfigurationImplementation loadSettings() {
        clientSettings = new ClientSettings().load();
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

            case CONFIG_FILE:
                mainConfig.set(storageKey.getPath(), string);
                cachedConfigStrings.put(storageKey, string);
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

            case CONFIG_FILE:
                mainConfig.set(path, string);
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

            case CONFIG_FILE:
                mainConfig.set(path, value);
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

            case CONFIG_FILE:
                mainConfig.set(storageKey.getPath(), value);
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
        this.loadSettings();
    }

    /**
     * saves the data to the file, like new regions and speakers.
     */
    @Override
    public void saveAll() {
        try {
            dataConfig.save("plugins/OpenAudioMc/data.yml");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void saveAllhard() {
        saveAll();
        OpenAudioMcSpigot.getInstance().saveResource("config.yml", true);
    }

    @Override
    public boolean hasDataFile() {
        File dataFile = new File("plugins/OpenAudioMc/data.yml");
        return dataFile.exists();
    }

    @Override
    public boolean hasStorageKey(StorageKey storageKey) {
        if (storageKey.getStorageLocation() == StorageLocation.DATA_FILE) {
            return dataConfig.contains(storageKey.getPath());
        }
        return mainConfig.contains(storageKey.getPath());
    }

}
