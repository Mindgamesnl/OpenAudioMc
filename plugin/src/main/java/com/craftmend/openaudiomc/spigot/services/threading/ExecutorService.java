package com.craftmend.openaudiomc.spigot.services.threading;

import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

import java.time.Duration;
import java.time.Instant;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.locks.ReentrantLock;

// TODO: Implement the show system to use _this_ instead of regular java timers.

@NoArgsConstructor
public class ExecutorService extends Service {

    @Inject
    private OpenAudioMcSpigot plugin;

    @Getter private Executor executor;
    @Getter private Queue<Runnable> tickRunnables = new ConcurrentLinkedQueue<>();
    @Getter private Queue<Runnable> secondRunnables = new ConcurrentLinkedQueue<>();
    @Getter private Queue<Runnable> runNextTick = new ConcurrentLinkedQueue<>();
    private ReentrantLock lock = new ReentrantLock();
    @Getter private Queue<Runnable> nextTickFallback = new ConcurrentLinkedQueue<>();
    private int tick = 0;
    @Getter private Instant lastPing = Instant.now();

    @Override
    public void onEnable() {
        boot();

        Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, executor::tickSync, 1, 1);
        Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, () -> {
            if (Duration.between(lastPing, Instant.now()).toMillis() > 10000) {
                executor.stop();
                executor = null;
                boot();
            }
        }, 80, 80);
    }

    private void boot() {
        executor = new Executor(0, 50, () -> {
            lock.lock();
            for (Runnable runnable : tickRunnables) {
                runnable.run();
            }

            tick++;
            if (tick >= 50) {
                for (Runnable secondRunnable : secondRunnables) {
                    secondRunnable.run();
                }
                tick = 0;
            }

            for (Runnable runnable : runNextTick) {
                runnable.run();
            }

            runNextTick.clear();
            lastPing = Instant.now();

            lock.unlock();
            runNextTick = nextTickFallback;
            nextTickFallback.clear();
        });

        executor.start();
    }

}
