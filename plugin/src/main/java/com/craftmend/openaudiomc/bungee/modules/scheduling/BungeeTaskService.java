package com.craftmend.openaudiomc.bungee.modules.scheduling;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;

import java.util.concurrent.TimeUnit;

/**
 * Bungeecord implementation of the OpenAudioMc scheduler standard.
 */
public class BungeeTaskService implements TaskService {

    @Override
    public int scheduleAsyncRepeatingTask(Runnable runnable, int period, int delay) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return scheduleSyncRepeatingTask(runnable, period, delay);
    }

    @Override
    public int scheduleSyncRepeatingTask(Runnable runnable, int period, int delay) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return OpenAudioMcBungee.getInstance().getProxy().getScheduler().schedule(OpenAudioMcBungee.getInstance(), runnable, (period / 20), (delay / 20), TimeUnit.SECONDS).getId();
    }

    @Override
    public int schduleSyncDelayedTask(Runnable runnable, int delay) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return OpenAudioMcBungee.getInstance().getProxy().getScheduler().schedule(OpenAudioMcBungee.getInstance(), runnable, (delay / 20), TimeUnit.SECONDS).getId();
    }

    @Override
    public int schduleAsyncRepeatingTask(Runnable runnable, int period, int delay) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        return OpenAudioMcBungee.getInstance().getProxy().getScheduler().schedule(OpenAudioMcBungee.getInstance(), runnable, (period / 20), (delay / 20), TimeUnit.SECONDS).getId();
    }

    @Override
    public void cancelRepeatingTask(int id) {
        OpenAudioMcBungee.getInstance().getProxy().getScheduler().cancel(id);
    }

    @Override
    public void runAsync(Runnable runnable) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            notifyRunner();
            runnable.run();
            return;
        }

        OpenAudioMcBungee.getInstance().getProxy().getScheduler().runAsync(OpenAudioMcBungee.getInstance(), runnable);
    }

    @Override
    public void runSync(Runnable runnable) {
        runnable.run();
    }
}
