package com.craftmend.openaudiomc.spigot.services.scheduling;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskProvider;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.Bukkit;

public class SpigotTaskProvider implements TaskProvider {

    @Override
    public int scheduleAsyncRepeatingTask(Runnable runnable, int period, int delay) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return Bukkit.getServer().getScheduler().scheduleAsyncRepeatingTask(OpenAudioMcSpigot.getInstance(), runnable, period, delay);
    }

    @Override
    public int scheduleSyncRepeatingTask(Runnable runnable, int period, int delay) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return Bukkit.getServer().getScheduler().scheduleSyncRepeatingTask(OpenAudioMcSpigot.getInstance(), runnable, period, delay);
    }

    @Override
    public int schduleSyncDelayedTask(Runnable runnable, int delay) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return Bukkit.getServer().getScheduler().scheduleSyncDelayedTask(OpenAudioMcSpigot.getInstance(), runnable, delay);
    }

    @Override
    public int schduleAsyncRepeatingTask(Runnable runnable, int period, int delay) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return Bukkit.getServer().getScheduler().scheduleAsyncRepeatingTask(OpenAudioMcSpigot.getInstance(), runnable, period, delay);
    }

    @Override
    public void cancelRepeatingTask(int id) {
        Bukkit.getScheduler().cancelTask(id);
    }

    @Override
    public void runAsync(Runnable runnable) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            OpenAudioLogger.toConsole("A async task was requested but server is already stopping, so I'm doing it now.");
            runnable.run();
            return;
        }

        Bukkit.getScheduler().runTaskAsynchronously(OpenAudioMcSpigot.getInstance(), runnable);
    }
}
