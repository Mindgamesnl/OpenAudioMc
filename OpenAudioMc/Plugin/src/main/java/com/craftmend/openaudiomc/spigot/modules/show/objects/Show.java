package com.craftmend.openaudiomc.spigot.modules.show.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import lombok.Getter;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

public class Show {

    @Getter private final String showName;
    @Getter private final Set<ShowCue> cueList = new HashSet<>();
    private transient ScheduledExecutorService showTimer = null;
    private transient Instant startedAt = null;
    @Getter private transient boolean isLooping = false;
    @Getter private transient int eventsProcessed = 0;
    @Getter private Long lastTaskTime = 1L;

    public Show(String showName) {
        this.showName = showName;
    }

    public Show addCue(ShowRunnable task, Long time) {
        cueList.add(new ShowCue(UUID.randomUUID(), time, task));
        return this;
    }

    @Override
    public String toString() {
        return OpenAudioMc.getGson().toJson(this);
    }

    public static Show fromJson(String json) {
        return OpenAudioMc.getGson().fromJson(json, Show.class);
    }

    public ShowCue getCueById(UUID id) {
        for (ShowCue showCue : cueList) {
            if (showCue.getId().equals(id)) return showCue;
        }
        return null;
    }

    public boolean isRunning() {
        return showTimer != null;
    }

    public void start() {
        start(false);
    }

    public void startLooping() {
        isLooping = true;
        start(true);
    }

    public void start(boolean fromLoop) {
        if (isRunning()) return;
        lastTaskTime = 1L;
        eventsProcessed = 0;

        showTimer = Executors.newScheduledThreadPool(1);

        for (ShowCue cue : cueList) {
            showTimer.schedule(() ->{
                eventsProcessed++;
                cue.getTask().run();
            }, cue.getTimestamp(), TimeUnit.MILLISECONDS);
        }

        updateLastTime();

        // schedule a task every second for progress
        int seconds = Math.toIntExact(lastTaskTime / 1000);
        IntStream.range(1, seconds).forEach(i -> {
            showTimer.schedule(() -> {
                //
            }, i * 1000, TimeUnit.MILLISECONDS);
        });

        // one tick after it ended
        showTimer.schedule(() -> {
            stop();
            if (isLooping) start(true);
        }, lastTaskTime + 50, TimeUnit.MILLISECONDS);
        startedAt = Instant.now();
    }

    public String currentFrameAsString() {
        Long millis = Duration.between(startedAt, Instant.now()).toMillis();
        return String.format("%02d:%02d:%02d", TimeUnit.MILLISECONDS.toHours(millis),
                TimeUnit.MILLISECONDS.toMinutes(millis) - TimeUnit.HOURS.toMinutes(TimeUnit.MILLISECONDS.toHours(millis)),
                TimeUnit.MILLISECONDS.toSeconds(millis) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(millis)));
    }

    public String getTimeRemainingAsString() {
        Long millis = getLastTaskTime() - Duration.between(startedAt, Instant.now()).toMillis();
        return String.format("%02d:%02d:%02d", TimeUnit.MILLISECONDS.toHours(millis),
                TimeUnit.MILLISECONDS.toMinutes(millis) - TimeUnit.HOURS.toMinutes(TimeUnit.MILLISECONDS.toHours(millis)),
                TimeUnit.MILLISECONDS.toSeconds(millis) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(millis)));
    }

    public void updateLastTime() {
        for (ShowCue cue : cueList) {
            if (lastTaskTime < cue.getTimestamp()) lastTaskTime = cue.getTimestamp();
        }
    }

    public void cancelLooping() {
        isLooping = false;
    }

    public void stop() {
        showTimer.shutdownNow();
        showTimer = null;
    }

    public Show save() {
        Charset charset = StandardCharsets.UTF_8;
        try  {
            BufferedWriter writer = Files.newBufferedWriter(new File(OpenAudioMcSpigot.getInstance().getDataFolder(), showName.toLowerCase() + ".json").toPath(), charset);
            String input = toString();
            writer.write(input);
            writer.flush();
            writer.close();
        } catch (IOException x) {
            OpenAudioLogger.error(x, "Failed to save show " + showName);
        }
        return this;
    }
}
