package com.craftmend.openaudiomc.generic.scheduling.interfaces;

public interface ITaskProvider {

    int scheduleSyncRepeatingTask(Runnable runnable, int period, int delay);
    int schduleSyncDelayedTask(Runnable runnable, int delay);
    int schduleAsyncRepeatingTask(Runnable runnable, int period, int delay);

}
