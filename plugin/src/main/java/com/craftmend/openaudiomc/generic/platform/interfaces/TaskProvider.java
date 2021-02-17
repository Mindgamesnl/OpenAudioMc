package com.craftmend.openaudiomc.generic.platform.interfaces;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;

public interface TaskProvider {

    int scheduleAsyncRepeatingTask(Runnable runnable, int period, int delay);
    int scheduleSyncRepeatingTask(Runnable runnable, int period, int delay);
    int schduleSyncDelayedTask(Runnable runnable, int delay);
    int schduleAsyncRepeatingTask(Runnable runnable, int period, int delay);
    void cancelRepeatingTask(int id);
    void runAsync(Runnable runnable);
    void runSync(Runnable runnable);

    default void notifyRunner() {
        StackTraceElement[] stacktrace = Thread.currentThread().getStackTrace();
        StackTraceElement e = stacktrace[3];
        OpenAudioLogger.toConsole("An async task was requested but server is already stopping, so I'm doing it now. Original requester was from " + e.getMethodName() + " in " + e.getFileName());
    }

}
