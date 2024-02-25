package com.craftmend.openaudiomc.velocity.modules.configuration;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.google.common.reflect.TypeToken;
import lombok.SneakyThrows;
import ninja.leaping.configurate.ConfigurationNode;
import ninja.leaping.configurate.objectmapping.ObjectMappingException;
import ninja.leaping.configurate.yaml.YAMLConfigurationLoader;
import org.apache.commons.lang.Validate;
import org.yaml.snakeyaml.DumperOptions;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class VelocityConfiguration implements Configuration {

    private final ConfigurationNode dataConfig;
    private final Map<StorageKey, String> cachedConfigStrings = new ConcurrentHashMap<>();
    private ConfigurationNode mainConfig;

    public VelocityConfiguration() {
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
     *
     * @param storageKey The storage key
     * @return the string
     */
    @Override
    public String getString(StorageKey storageKey) {
        Object[] path = storageKey.getPath().split("\\.");
        switch (storageKey.getStorageLocation()) {
            case DATA_FILE:
                return dataConfig.getNode(path).getString();

            case CONFIG_FILE:
                return ((mainConfig.getNode(path).isVirtual() ? "<unknown openaudiomc value " + storageKey.getPath() + ">"
                        : mainConfig.getNode(path).getString()));

            default:
                return "<unknown openaudiomc value " + storageKey.getPath() + ">";
        }
    }

    /**
     * get a specific int from a config
     *
     * @param storageKey The storage key
     * @return the int, -1 if absent
     */
    @Override
    public int getInt(StorageKey storageKey) {
        Object[] path = storageKey.getPath().split("\\.");
        switch (storageKey.getStorageLocation()) {
            case DATA_FILE:
                return dataConfig.getNode(path).getInt();

            case CONFIG_FILE:
                return mainConfig.getNode(path).getInt();

            default:
                return -1;
        }
    }

    /**
     * A safe string getter
     *
     * @param path            The path
     * @param storageLocation specified file
     * @return the string, or a empty string instead of null
     */
    @Override
    public String getStringFromPath(String path, StorageLocation storageLocation) {
        Validate.isTrue(storageLocation == StorageLocation.DATA_FILE, "Getting strings from a config file with hardcoded paths is not allowed");
        ConfigurationNode node = dataConfig.getNode((Object[]) path.split("\\."));

        if(node.isVirtual()) {
            return "";
        }

        return node.getString();
    }

    @Override
    public boolean isPathValid(String path, StorageLocation storageLocation) {
        Object[] pathArr = path.split("\\.");
        switch (storageLocation) {
            case DATA_FILE:
                return !dataConfig.getNode(pathArr).isVirtual();

            case CONFIG_FILE:
                return !mainConfig.getNode(pathArr).isVirtual();

            default:
                return false;
        }
    }

    /**
     * A safe int getter
     *
     * @param path            The path
     * @param storageLocation specified file
     * @return the int value
     */
    @Override
    public Integer getIntFromPath(String path, StorageLocation storageLocation) {
        Validate.isTrue(storageLocation == StorageLocation.DATA_FILE, "Getting strings from a config file with hardcoded paths is not allowed");
        return dataConfig.getNode((Object[]) path.split("\\.")).getInt();
    }

    /**
     * get a set of keys under a config section, will never be null so its safe
     *
     * @param path            Path
     * @param storageLocation file target
     * @return a set of keys, can be empty
     */
    @Override
    public Set<String> getStringSet(String path, StorageLocation storageLocation) {
        throw new UnsupportedOperationException("Not supported in velocity (proxy) mode");
    }

    @Override
    public List<Map<String, Object>> getObjectList(String path, StorageLocation storageLocation) {
        ConfigurationNode node = storageLocation == StorageLocation.DATA_FILE ? dataConfig : mainConfig;
        try {
            List<Map> lm = node.getNode((Object[]) path.split("\\.")).getList(TypeToken.of(Map.class));
            List<Map<String, Object>> result = new ArrayList<>();
            for (Map map : lm) {
                result.add(map);
            }
            return result;
        } catch (ObjectMappingException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    /**
     * Write/update a string value for a file
     *
     * @param location The storage key
     * @param string   the new value
     */
    @SneakyThrows
    @Override
    public void setString(StorageKey location, String string) {
        Object[] path = location.getPath().split("\\.");
        TypeToken token = TypeToken.of(String.class);
        switch (location.getStorageLocation()) {
            case DATA_FILE:
                dataConfig.getNode(path).setValue(token, string);
                break;

            case CONFIG_FILE:
                mainConfig.getNode(path).setValue(token, string);
                cachedConfigStrings.put(location, string);
                break;
        }
    }

    /**
     * write a soft value to a file
     *
     * @param storageLocation The file to save to
     * @param path            the path
     * @param string          the value
     */
    @SneakyThrows
    @Override
    public void setString(StorageLocation storageLocation, String path, String string) {
        Object[] pathArr = path.split("\\.");
        TypeToken token = TypeToken.of(String.class);
        switch (storageLocation) {
            case DATA_FILE:
                dataConfig.getNode(pathArr).setValue(token, string);
                break;

            case CONFIG_FILE:
                mainConfig.getNode(pathArr).setValue(token, string);
                break;
        }
    }

    /**
     * write a soft value to a file
     *
     * @param storageLocation The file to save to
     * @param path            the path
     * @param value           the value
     */
    @Override
    public void setInt(StorageLocation storageLocation, String path, int value) {
        Object[] pathArr = path.split("\\.");
        switch (storageLocation) {
            case DATA_FILE:
                dataConfig.getNode(pathArr).setValue(value);
                break;

            case CONFIG_FILE:
                mainConfig.getNode(pathArr).setValue(value);
                break;
        }
    }

    /**
     * Get a boolean value, from any file
     *
     * @param location The storage key
     * @return boolean value
     */
    @Override
    public boolean getBoolean(StorageKey location) {
        Object[] path = location.getPath().split("\\.");
        switch (location.getStorageLocation()) {
            case DATA_FILE:
                return dataConfig.getNode(path).getBoolean();

            case CONFIG_FILE:
                return mainConfig.getNode(path).getBoolean();

            default:
                return false;
        }
    }

    @Override
    public Object get(StorageKey location) {
        Object[] path = location.getPath().split("\\.");
        switch (location.getStorageLocation()) {
            case DATA_FILE:
                return dataConfig.getNode(path).getValue();

            case CONFIG_FILE:
                return mainConfig.getNode(path).getValue();

            default:
                return false;
        }
    }

    @SneakyThrows
    @Override
    public void set(StorageKey location, Object value) {
        Object[] path = location.getPath().split("\\.");
        TypeToken token = TypeToken.of(value.getClass());

        switch (location.getStorageLocation()) {
            case DATA_FILE:
                dataConfig.getNode(path).setValue(token, value);
                break;

            case CONFIG_FILE:
                mainConfig.getNode(path).setValue(token, value);
                break;
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
    public void saveAll(boolean ignored) {
        try {
            File config = new File(OpenAudioMcVelocity.getInstance().getDataDir(), "config.yml");
            File data = new File(OpenAudioMcVelocity.getInstance().getDataDir(), "data.yml");

            YAMLConfigurationLoader.builder()
                    .setFile(config)
                    .build().save(mainConfig);

            YAMLConfigurationLoader.builder()
                    .setFile(data)
                    .build().save(dataConfig);
        } catch (IOException e) {
            OpenAudioLogger.error(e, "Failed to save config files");
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
        Object[] path = storageKey.getPath().split("\\.");
        if (storageKey.getStorageLocation() == StorageLocation.DATA_FILE) {
            return !dataConfig.getNode(path).isVirtual();
        }
        return !mainConfig.getNode(path).isVirtual();
    }

    private ConfigurationNode getFile(String filename) {
        File file = new File(OpenAudioMcVelocity.getInstance().getDataDir(), filename);
        YAMLConfigurationLoader yamlLoader = YAMLConfigurationLoader.builder()
                .setFile(file)
                .setFlowStyle(DumperOptions.FlowStyle.BLOCK)
                .build();
        try {
            return yamlLoader.load();
        } catch (IOException e) {
            OpenAudioLogger.error(e, "Failed to load file " + filename);
        }
        return null;
    }

    private void saveDefaultFile(String filename, boolean hard) {
        if (!OpenAudioMcVelocity.getInstance().getDataDir().exists())
            OpenAudioMcVelocity.getInstance().getDataDir().mkdir();

        File file = new File(OpenAudioMcVelocity.getInstance().getDataDir(), filename);

        if (hard && file.exists()) {
            try {
                Files.delete(file.toPath());
            } catch (IOException e) {
                OpenAudioLogger.error(e, "Failed to delete file " + filename);
            }
        }

        if (!file.exists() || hard) {
            try (InputStream in = OpenAudioMcVelocity.getInstance().getClass().getClassLoader().getResourceAsStream(filename)) {
                Files.copy(in, file.toPath());
            } catch (IOException e) {
                OpenAudioLogger.error(e, "Failed to save default file " + filename);
            }
        }
    }

    @Override
    public void setBoolean(StorageKey location, boolean value) {
        Object[] path = location.getPath().split("\\.");
        switch (location.getStorageLocation()) {
            case DATA_FILE:
                dataConfig.getNode(path).setValue(value);
                break;

            case CONFIG_FILE:
                mainConfig.getNode(path).setValue(value);
                break;
        }
    }

}
