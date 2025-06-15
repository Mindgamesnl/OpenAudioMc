package com.craftmend.openaudiomc.spigot.services.scheduling;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.Bukkit;

public class SpigotTaskService implements TaskService {

    @Override
    public int scheduleAsyncRepeatingTask(Runnable runnable, int delayUntilFirst, int tickInterval) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return Bukkit.getServer().getScheduler().scheduleAsyncRepeatingTask(OpenAudioMcSpigot.getInstance(), runnable, delayUntilFirst, tickInterval);
    }

    @Override
    public int scheduleSyncRepeatingTask(Runnable runnable, int delayUntilFirst, int tickInterval) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return Bukkit.getServer().getScheduler().scheduleSyncRepeatingTask(OpenAudioMcSpigot.getInstance(), runnable, delayUntilFirst, tickInterval);
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
    public void cancelRepeatingTask(int id) {
        Bukkit.getScheduler().cancelTask(id);
    }

    @Override
    public void runAsync(Runnable runnable) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            notifyRunner();
            runnable.run();
            return;
        }

        Bukkit.getScheduler().runTaskAsynchronously(OpenAudioMcSpigot.getInstance(), runnable);
    }

    @Override
    public void runSync(Runnable runnable) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            notifyRunner();
            runnable.run();
            return;
        }

        Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), runnable);
    }
}
