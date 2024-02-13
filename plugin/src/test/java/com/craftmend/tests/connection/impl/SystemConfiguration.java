package com.craftmend.tests.connection.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.utils.system.FileUtil;
import lombok.SneakyThrows;
import org.apache.commons.lang.Validate;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class SystemConfiguration extends Service implements Configuration {

    public static String BASE_PATH;

    static {
        try {
            BASE_PATH = new File(OpenAudioMc.class.getProtectionDomain().getCodeSource().getLocation().toURI().getPath()).getParentFile().getPath().replace('\\', File.separator.toCharArray()[0]);
        } catch (URISyntaxException e) {
            // don't even know if this is possible
            e.printStackTrace();
        }
    }

    private final Map<String, Object> mainConfig;
    private final Map<String, Object> dataConfig;
    private File dataFile;
    private File configFile;

    @Inject
    @SneakyThrows
    public SystemConfiguration() {
        OpenAudioLogger.info("Using storage base path " + BASE_PATH);
        MagicValue.overWrite(MagicValue.STORAGE_DIRECTORY, new File(SystemConfiguration.BASE_PATH));
        dataFile = new File(BASE_PATH + "/data.yml");
        configFile = new File(BASE_PATH + "/config.yml");

        if (!dataFile.exists()) {
            OpenAudioLogger.info("Creating data.yml");
            dataFile = new File(FileUtil.exportResource("/data.yml", OpenAudioMc.class, new File(BASE_PATH)));
        }

        if (!configFile.exists()) {
            OpenAudioLogger.info("Creating config.yml");
            configFile = new File(FileUtil.exportResource("/config.yml", OpenAudioMc.class, new File(BASE_PATH)));
        }

        mainConfig = new Yaml().load(new FileInputStream(configFile));
        dataConfig = new Yaml().load(new FileInputStream(dataFile));
    }

    private Object resolve(String key, StorageLocation location) {
        Map<String, Object> haystack = null;
        switch (location) {
            case DATA_FILE:
                haystack = dataConfig;
                break;
            case CONFIG_FILE:
                haystack = mainConfig;
                break;
        }

        Object lastResult = null;
        for (String s : key.split("\\.")) {
            if (lastResult != null && !(lastResult instanceof Map)) {
                break;
            }
            if (lastResult == null) {
                lastResult = haystack.get(s);
            } else {
                lastResult = ((Map<String, Object>) lastResult).get(s);
            }
        }
        return lastResult;
    }

    public void set(String key, Object value, StorageLocation location) {
        OpenAudioLogger.info("Setting " + key + " to " + value);
        Map<String, Object> haystack = null;
        switch (location) {
            case DATA_FILE:
                haystack = dataConfig;
                break;
            case CONFIG_FILE:
                haystack = mainConfig;
                break;
        }

        Object lastResult = null;
        for (String s : key.split("\\.")) {
            if (lastResult != null && (lastResult instanceof Map)) {
                ((Map<String, Object>) lastResult).put(s, value);
            }

            if (lastResult == null) {
                lastResult = haystack.get(s);
            } else {
                lastResult = ((Map<String, Object>) lastResult).get(s);
            }
        }
    }

    @SneakyThrows
    @Override
    public void saveAll(boolean ignored) {
        OpenAudioLogger.info("Saving files...");
        DumperOptions options = new DumperOptions();
        options.setPrettyFlow(true);
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.FLOW);
        options.setDefaultScalarStyle(DumperOptions.ScalarStyle.PLAIN);
        new Yaml(options).dump(dataConfig, new FileWriter(dataFile.getAbsolutePath()));
        new Yaml(options).dump(mainConfig, new FileWriter(configFile.getAbsolutePath()));
    }

    @SneakyThrows
    @Override
    public void overwriteConfigFile() {
    }

    @Override
    public boolean hasDataFile() {
        return true;
    }

    @Override
    public Configuration loadSettings() {
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
        return (String) resolve(storageKey.getPath(), storageKey.getStorageLocation());
    }

    /**
     * get a specific int from a config
     *
     * @param storageKey The storage key
     * @return the int, -1 if absent
     */
    @Override
    public int getInt(StorageKey storageKey) {
        return (Integer) resolve(storageKey.getPath(), storageKey.getStorageLocation());
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
        String value = (String) dataConfig.get(path);
        return value == null ? "" : value;
    }

    @Override
    public boolean isPathValid(String path, StorageLocation storageLocation) {
        return (Boolean) resolve(path, storageLocation);
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
        return (Integer) resolve(path, storageLocation);
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
        throw new UnsupportedOperationException("Not supported in bungeecord mode");
    }

    @Override
    public List<Map<String, Object>> getObjectList(String path, StorageLocation storageLocation) {
        return null;
    }

    /**
     * Write/update a string value for a file
     *
     * @param storageKey The storage key
     * @param string     the new value
     */
    @Override
    public void setString(StorageKey storageKey, String string) {
        set(storageKey.getPath(), string, storageKey.getStorageLocation());
    }

    /**
     * write a soft value to a file
     *
     * @param storageLocation The file to save to
     * @param path            the path
     * @param string          the value
     */
    @Override
    public void setString(StorageLocation storageLocation, String path, String string) {
        set(path, string, storageLocation);
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
        set(path, value, storageLocation);
    }

    /**
     * Get a boolean value, from any file
     *
     * @param storageKey The storage key
     * @return boolean value
     */
    @Override
    public boolean getBoolean(StorageKey storageKey) {
        return (Boolean) resolve(storageKey.getPath(), storageKey.getStorageLocation());
    }

    @Override
    public Object get(StorageKey storageKey) {
        return resolve(storageKey.getPath(), storageKey.getStorageLocation());
    }

    @Override
    public void set(StorageKey storageKey, Object value) {
        set(storageKey.getPath(), value, storageKey.getStorageLocation());
    }

    @Override
    public void reloadConfig() {

    }

    @Override
    public boolean hasStorageKey(StorageKey storageKey) {
        Object value = resolve(storageKey.getPath(), storageKey.getStorageLocation());
        return value != null;
    }

    @Override
    public void setBoolean(StorageKey location, boolean value) {
        set(location.getPath(), value, location.getStorageLocation());
    }
}
