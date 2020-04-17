package com.craftmend.openaudiomc.bungee.modules.configuration;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.loggin.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.objects.ClientSettings;
import com.craftmend.openaudiomc.generic.interfaces.OAConfiguration;
import lombok.Getter;
import net.md_5.bungee.config.Configuration;
import net.md_5.bungee.config.ConfigurationProvider;
import net.md_5.bungee.config.YamlConfiguration;
import org.apache.commons.lang.Validate;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class BungeeConfigurationModule implements OAConfiguration {

    @Deprecated @Getter private ClientSettings clientSettings;
    private Configuration mainConfig;
    private Configuration dataConfig;

    private Map<StorageKey, String> cachedConfigStrings = new HashMap<>();

    public BungeeConfigurationModule() {
        //save default
        saveDefaultFile("data.yml", false);
        saveDefaultFile("config.yml", false);

        dataConfig = getFile("data.yml");
        mainConfig = getFile("config.yml");

        OpenAudioLogger.toConsole("Starting configuration module");
    }

    public void loadSettings() {
        clientSettings = new ClientSettings().load();
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
                return cachedConfigStrings.computeIfAbsent(storageKey, v -> mainConfig.getString(storageKey.getPath()));

            default:
                return "no string";
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

    /**
     * Reload the config file
     */
    @Override
    public void reloadConfig() {
        this.cachedConfigStrings.clear();
        mainConfig = getFile("config.yml");
    }

    /**
     * saves the data to the file, like new regions and speakers.
     */
    @Override
    public void saveAll() {
        try {
            ConfigurationProvider.getProvider(YamlConfiguration.class).save(mainConfig, new File(OpenAudioMcBungee.getInstance().getDataFolder(), "config.yml"));
            ConfigurationProvider.getProvider(YamlConfiguration.class).save(dataConfig, new File(OpenAudioMcBungee.getInstance().getDataFolder(), "data.yml"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void saveAllhard() {
        saveAll();
        saveDefaultFile("config.yml", true);
    }

    @Override
    public boolean hasDataFile() {
        return true;
    }

    private Configuration getFile(String filename) {
        Configuration load = null;
        try {
            load = ConfigurationProvider.getProvider(YamlConfiguration.class).load(new File(OpenAudioMcBungee.getInstance().getDataFolder(), filename));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return load;
    }

    private void saveDefaultFile(String filename, boolean hard) {
        if (!OpenAudioMcBungee.getInstance().getDataFolder().exists())
            OpenAudioMcBungee.getInstance().getDataFolder().mkdir();

        File file = new File(OpenAudioMcBungee.getInstance().getDataFolder(), filename);


        if (!file.exists() || hard) {
            try (InputStream in = OpenAudioMcBungee.getInstance().getResourceAsStream(filename)) {
                Files.copy(in, file.toPath());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
