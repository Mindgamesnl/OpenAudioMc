package com.craftmend.openaudiomc.spigot.services.threading;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import lombok.Getter;

import java.time.Duration;
import java.time.Instant;

public class Executor {

    private Runnable task;
    @Getter private int msInterval;
    private Instant lastPingFromOtherThread = Instant.now();
    private Thread thread;
    private boolean running = true;
    private int threadOffsetTrigger = 5;
    private int pauseRuns = 0;
    @Getter private int overTime = 0;

    public Executor(int pauseRuns, int msInterval, Runnable task) {
        this.msInterval = msInterval;
        this.pauseRuns = pauseRuns;
        this.task = task;
    }

    public void start() {
        if (thread == null) {
            thread = new Thread(() -> {
                while (running) {
                    // start time
                    Instant start = Instant.now();
                    // start tas
                    if (this.pauseRuns != 0) {
                        this.pauseRuns--;
                    } else {
                        try {
                            task.run();
                        } catch (Exception e) {
                            OpenAudioLogger.error(e, "Failed to execute executor task");
                        }
                    }
                    Instant end = Instant.now();
                    // how long did the task take?
                    int delayTime = msInterval - (int) Duration.between(start, end).toMillis();

                    // if we are ahead of the other task, we must add time
                    int aheadOfOtherThread = (int) Duration.between(Instant.now(), lastPingFromOtherThread).toMillis();
                    if (aheadOfOtherThread >= threadOffsetTrigger) {
                        delayTime -= aheadOfOtherThread;
                    }

                    // if the execution time is larger or equal to the delay time, skip a round
                    if (delayTime <= 0) {
                        overTime = delayTime;
                        continue;
                    } else {
                        overTime = 0;
                    }

                    try {
                        Thread.sleep(delayTime);
                    } catch (InterruptedException e) {
                        OpenAudioLogger.error(e, "Failed to sleep executor thread");
                    }
                }
            });

            thread.start();
        }
    }

    public void setThreadOfsetTrigger(int threadOffsetTrigger) {
        this.threadOffsetTrigger = threadOffsetTrigger;
    }

    public void tickSync() {
        lastPingFromOtherThread = Instant.now();
    }

    public void setTask(Runnable task) {
        this.task = task;
    }

    public void setMsInterval(int msInterval) {
        this.msInterval = msInterval;
    }

    public void setPauseRuns(int pauseRuns) {
        this.pauseRuns = pauseRuns;
    }

    public void stop() {
        running = false;
        this.thread.stop();
    }

}

