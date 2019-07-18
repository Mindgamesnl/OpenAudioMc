package com.craftmend.openaudiomc.services.utils;

import com.craftmend.openaudiomc.services.utils.interfaces.Feeder;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

import java.util.function.Consumer;

public class DataWatcher<T> {

    private T value;
    private int task;
    private Feeder<T> dataFeeder;
    private Consumer<T> callback;
    private Boolean isRunning = false;

    public DataWatcher(JavaPlugin plugin, Boolean sync, int delayTicks) {
        Runnable executor = () -> {
            if (this.dataFeeder == null || this.dataFeeder == null) return;
            T newValue = dataFeeder.feed();
            if (this.value != null && !newValue.equals(this.value)) this.callback.accept(newValue);
            this.value = newValue;
        };

        if (sync) {
            this.task = Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, executor, delayTicks, delayTicks);
        } else {
            this.task = Bukkit.getScheduler().scheduleAsyncRepeatingTask(plugin, executor, delayTicks, delayTicks);
        }

        isRunning = true;
    }

    public DataWatcher setFeeder(Feeder<T> feeder) {
        this.dataFeeder = feeder;
        return this;
    }

    public DataWatcher setTask(Consumer<T> task) {
        this.callback = task;
        return this;
    }

    public Boolean isRunning() {
        return this.isRunning;
    }

    public void stop() {
        Bukkit.getScheduler().cancelTask(this.task);
        this.isRunning = false;
    }

}
