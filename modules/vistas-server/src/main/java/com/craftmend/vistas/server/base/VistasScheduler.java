package com.craftmend.vistas.server.base;

import com.coreoz.wisp.Scheduler;
import com.coreoz.wisp.schedule.Schedules;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class VistasScheduler extends Service implements TaskService {

    private Scheduler scheduler;
    private int taskCount = 0;
    private List<Integer> runningTasks = new ArrayList<>();

    public VistasScheduler() {
        scheduler = new Scheduler();
    }

    @Override
    public int scheduleAsyncRepeatingTask(Runnable runnable, int delayUntilFirst, int tickInterval) {
        int delayMs = delayUntilFirst * 50;
        int intervalMs = tickInterval * 50;
        int currentTask = taskCount++;

        runningTasks.add(currentTask);
        WrappedRunnable handler = new WrappedRunnable();

        handler.setTask(() -> {
            if (isCancelled(currentTask)) {
                runningTasks.removeIf(task -> task == currentTask);
                return;
            }

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
    public int scheduleSyncRepeatingTask(Runnable runnable, int delayUntilFirst, int tickInterval) {
        return scheduleAsyncRepeatingTask(runnable, delayUntilFirst, tickInterval);
    }

    @Override
    public int schduleSyncDelayedTask(Runnable runnable, int delay) {
        int delayMs = delay * 50;
        int currentTask = taskCount++;
        runningTasks.add(currentTask);

        scheduler.schedule(
                () -> {
                    if (isCancelled(currentTask)) {
                        runningTasks.removeIf(task -> task == currentTask);
                        return;
                    }
                    runnable.run();
                    runningTasks.removeIf(task -> task == currentTask);
                },
                Schedules.executeOnce(Schedules.fixedDelaySchedule(Duration.ofMillis(delayMs)))
        );

        return currentTask;
    }

    public boolean isCancelled(int task) {
        return !runningTasks.contains(task);
    }

    @Override
    public void cancelRepeatingTask(int i) {
        runningTasks.removeIf(task -> task == i);
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
