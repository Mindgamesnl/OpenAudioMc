package com.craftmend.openaudiomc.generic.scheduling;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import net.md_5.bungee.api.plugin.Plugin;
import org.bukkit.Bukkit;

import java.util.concurrent.TimeUnit;

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
        if (OpenAudioMcCore.getInstance().getPlatform() == Platform.SPIGOT) {
            Bukkit.getScheduler().scheduleSyncDelayedTask(OpenAudioMcSpigot.getInstance(), executable, delay);
        } else {
            Plugin bungee = OpenAudioMcBungee.getInstance();
            bungee.getProxy().getScheduler().schedule(bungee, executable, (delay / 20), TimeUnit.SECONDS);
        }
    }

}
