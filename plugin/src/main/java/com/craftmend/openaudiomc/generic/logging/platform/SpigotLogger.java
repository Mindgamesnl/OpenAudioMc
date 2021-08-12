package com.craftmend.openaudiomc.generic.logging.platform;

import com.craftmend.openaudiomc.generic.logging.Logger;
import lombok.AllArgsConstructor;
import java.util.logging.Level;
import org.bukkit.plugin.java.JavaPlugin;

@AllArgsConstructor
public class SpigotLogger implements Logger {

    private JavaPlugin plugin;

    @Override
    public void error(String s) {
        plugin.getLogger().log(Level.SEVERE, s);
    }

    @Override
    public void info(String s) {
        plugin.getLogger().log(Level.INFO, s);
    }
}
