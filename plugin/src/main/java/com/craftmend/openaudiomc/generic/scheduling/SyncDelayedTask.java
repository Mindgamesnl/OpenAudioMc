package com.craftmend.openaudiomc.generic.scheduling;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.Bukkit;

public class SyncDelayedTask {

    private int delay;
    private Runnable executable;

    public SyncDelayedTask(int delay) {
        this.delay = delay;
    }

    public SyncDelayedTask setTask(Runnable runnable) {
        this.executable = runnable;
        return this;
    }

    public void start() {
        // handle based on platform
        if (OpenAudioMc.getInstance().getPlatform().equals(Platform.SPIGOT)) {
            Bukkit.getScheduler().scheduleSyncDelayedTask(OpenAudioMcSpigot.getInstance(), executable, delay);
        } else {
            // OpenAudioMcBungee.getInstance().getProxy().getScheduler().schedule(OpenAudioMcBungee.getInstance(), executable, (delay / 20), TimeUnit.SECONDS);
        }
    }

}
