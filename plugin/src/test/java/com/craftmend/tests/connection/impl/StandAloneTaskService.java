package com.craftmend.tests.connection.impl;

import com.coreoz.wisp.Scheduler;
import com.coreoz.wisp.schedule.Schedules;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Service;

import java.time.Duration;
import java.util.HashSet;
import java.util.Set;

public class StandAloneTaskService extends Service implements TaskService {

    private Scheduler scheduler;
    private int taskCount = 0;
    private Set<Integer> runningTasks = new HashSet<>();

    public StandAloneTaskService() {
        scheduler = new Scheduler();
    }

    @Override
    public int scheduleAsyncRepeatingTask(Runnable runnable, int delay, int interval) {
        int delayMs = delay * 50;
        int intervalMs = interval * 50;
        taskCount++;
        int currentTask = taskCount;

        runningTasks.add(currentTask);
        WrappedRunnable handler = new WrappedRunnable();

        handler.setTask(() -> {
            if (isCancelled(currentTask)) {
                runningTasks.remove(currentTask);
                return;
            };

            runnable.run();

            scheduler.schedule(
                    () -> {
                        handler.getTask().run();
                    },
                    Schedules.executeOnce(Schedules.fixedDelaySchedule(Duration.ofMillis(intervalMs)))
            );

        });

        scheduler.schedule(
                handler.getTask(),
                Schedules.executeOnce(Schedules.fixedDelaySchedule(Duration.ofMillis(delayMs)))
        );

        return currentTask;
    }

    @Override
    public int scheduleSyncRepeatingTask(Runnable runnable, int delay, int interval) {
        return scheduleAsyncRepeatingTask(runnable, delay, interval);
    }

    @Override
    public int schduleSyncDelayedTask(Runnable runnable, int delay) {
        int delayMs = delay * 50;

        taskCount++;
        int currentTask = taskCount;
        runningTasks.add(currentTask);

        scheduler.schedule(
                () -> {
                    if (isCancelled(currentTask)) {
                        runningTasks.remove(currentTask);
                        return;
                    }
                    runnable.run();
                    runningTasks.remove(currentTask);
                },
                Schedules.executeOnce(Schedules.fixedDelaySchedule(Duration.ofMillis(delayMs)))
        );

        return currentTask;
    }

    @Override
    public int schduleAsyncRepeatingTask(Runnable runnable, int delay, int interval) {
        return scheduleAsyncRepeatingTask(runnable, delay, interval);
    }

    public boolean isCancelled(int task) {
        return !runningTasks.contains(task);
    }

    @Override
    public void cancelRepeatingTask(int i) {
        runningTasks.remove(i);
    }

    @Override
    public void runAsync(Runnable runnable) {
        scheduler.schedule(
                () -> {
                    runnable.run();
                },
                Schedules.executeOnce(Schedules.fixedDelaySchedule(Duration.ofMillis(1)))
        );
    }

    @Override
    public void runSync(Runnable runnable) {
        scheduler.schedule(
                runnable,
                Schedules.executeOnce(Schedules.fixedDelaySchedule(Duration.ofMillis(1)))
        );
    }

    private String callerName() {
        StackTraceElement[] stacktrace = Thread.currentThread().getStackTrace();
        StackTraceElement e = stacktrace[3];
        return e.getMethodName() + " in " + e.getFileName();
    }

}
