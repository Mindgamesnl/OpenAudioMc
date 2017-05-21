package net.openaudiomc.utils;

import org.bukkit.configuration.file.FileConfiguration;

import java.io.File;
import java.io.IOException;

/**
 * Created by mats on 21-5-2017.
 */
public class oaStorage {

    private File file;
    private FileConfiguration fc;

    public oaStorage(String name) {
        this.file = new File("plugins/OpenAudio/oaStorage", name+".yml");
        try {
            this.file.createNewFile();
        } catch (IOException e) {}
    }

    public void set(String path, Object value) {
        this.fc.set(path, value);
        try {
            this.fc.save(this.file);
        } catch (IOException e) {}
    }

    public Object get(String path) {
        return this.fc.get(path);
    }

}
