package com.craftmend.vistas.server.base;

import com.coreoz.wisp.JobStatus;
import com.coreoz.wisp.Scheduler;
import com.coreoz.wisp.schedule.Schedules;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Service;

import java.time.Duration;
import java.util.UUID;

public class VistasScheduler extends Service implements TaskService {

    private final Scheduler scheduler;
    private int taskCount = 0;

    public VistasScheduler() {
        scheduler = new Scheduler();

        scheduler.schedule(
                "Terminated jobs cleaner",
                () -> scheduler
                        .jobStatus()
                        .stream()
                        .filter(job -> job.status() == JobStatus.DONE)
                        // Clean only jobs that have finished executing since at least 10 seconds
                        .filter(job -> job.lastExecutionEndedTimeInMillis() < (System.currentTimeMillis() - 10000))
                        .forEach(job -> scheduler.remove(job.name())),
                Schedules.fixedDelaySchedule(Duration.ofSeconds(5))
        );
    }

    @Override
    public int scheduleAsyncRepeatingTask(Runnable runnable, int delayUntilFirst, int tickInterval) {
        int delayMs = delayUntilFirst * 50;
        int intervalMs = tickInterval * 50;
        int currentTask = taskCount++;

        scheduler.schedule(
                currentTask + "",
                () -> {
                    runnable.run();
                },
                Schedules.fixedDelaySchedule(Duration.ofMillis(intervalMs))
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

        scheduler.schedule(
                currentTask + "",
                () -> {
                    runnable.run();
                },
                Schedules.executeOnce(Schedules.fixedDelaySchedule(Duration.ofMillis(delayMs)))
        );

        return currentTask;
    }

    @Override
    public void cancelRepeatingTask(int i) {
        scheduler.cancel(i + "");
    }

    @Override
    public void runAsync(Runnable runnable) {
        scheduler.schedule(
                UUID.randomUUID().toString(),
                () -> {
                    runnable.run();
                },
                Schedules.executeOnce(Schedules.fixedDelaySchedule(Duration.ofMillis(1)))
        );
    }

    @Override
    public void runSync(Runnable runnable) {
        scheduler.schedule(
                UUID.randomUUID().toString(),
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
