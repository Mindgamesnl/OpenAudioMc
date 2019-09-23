package com.craftmend.openaudiomc.bungee.modules.scheduling;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.scheduling.interfaces.ITaskProvider;

import java.util.concurrent.TimeUnit;

public class BungeeTaskProvider implements ITaskProvider {

    @Override
    public int scheduleSyncRepeatingTask(Runnable runnable, int period, int delay) {
        return OpenAudioMcBungee.getInstance().getProxy().getScheduler().schedule(OpenAudioMcBungee.getInstance(), runnable, (period / 20), (delay / 20), TimeUnit.SECONDS).getId();
    }

    @Override
    public int schduleSyncDelayedTask(Runnable runnable, int delay) {
        return OpenAudioMcBungee.getInstance().getProxy().getScheduler().schedule(OpenAudioMcBungee.getInstance(), runnable, (delay / 20), TimeUnit.SECONDS).getId();
    }

    @Override
    public int schduleAsyncRepeatingTask(Runnable runnable, int period, int delay) {
        return OpenAudioMcBungee.getInstance().getProxy().getScheduler().schedule(OpenAudioMcBungee.getInstance(), runnable, (period / 20), (delay / 20), TimeUnit.SECONDS).getId();
    }

    @Override
    public void cancelRepeatingTask(int id) {
        OpenAudioMcBungee.getInstance().getProxy().getScheduler().cancel(id);
    }

    @Override
    public void runAsync(Runnable runnable) {
        OpenAudioMcBungee.getInstance().getProxy().getScheduler().runAsync(OpenAudioMcBungee.getInstance(), runnable);
    }
}
