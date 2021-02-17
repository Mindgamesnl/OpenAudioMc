package com.craftmend.openaudiomc.velocity.modules.scheduling;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskProvider;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.velocitypowered.api.scheduler.ScheduledTask;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

public class VelocityTaskProvider implements TaskProvider {
    private final ConcurrentMap<Integer, ScheduledTask> tasks = new ConcurrentHashMap<>();

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

        ScheduledTask task = OpenAudioMcVelocity.getInstance().getServer().getScheduler()
                .buildTask(OpenAudioMcVelocity.getInstance(), runnable)
                .delay((delay / 20), TimeUnit.SECONDS)
                .repeat((period / 20), TimeUnit.SECONDS)
                .schedule();
        return putTask(task);
    }

    @Override
    public int schduleSyncDelayedTask(Runnable runnable, int delay) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            runnable.run();
            return -1;
        }

        ScheduledTask task = OpenAudioMcVelocity.getInstance().getServer().getScheduler()
                .buildTask(OpenAudioMcVelocity.getInstance(), runnable)
                .delay((delay / 20), TimeUnit.SECONDS)
                .schedule();
        return putTask(task);
    }

    @Override
    public int schduleAsyncRepeatingTask(Runnable runnable, int period, int delay) {
        return scheduleSyncRepeatingTask(runnable, period, delay);
    }

    @Override
    public void cancelRepeatingTask(int id) {
        getTask(id).ifPresent(task -> {
            task.cancel();
            tasks.remove(id);
        });
    }

    @Override
    public void runAsync(Runnable runnable) {
        if (OpenAudioMc.getInstance().isDisabled()) {
            notifyRunner();
            runnable.run();
            return;
        }

        OpenAudioMcVelocity.getInstance().getServer().getScheduler()
                .buildTask(OpenAudioMcVelocity.getInstance(), runnable)
                .schedule();
    }

    @Override
    public void runSync(Runnable runnable) {
        runnable.run();
    }

    private int putTask(ScheduledTask task) {
        int randomId = ThreadLocalRandom.current().nextInt(Integer.MAX_VALUE);
        tasks.put(randomId, task);
        return randomId;
    }

    private Optional<ScheduledTask> getTask(int id) {
        if (!tasks.containsKey(id))
            return Optional.empty();
        return Optional.of(tasks.get(id));
    }
}
