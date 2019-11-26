package com.craftmend.openaudiomc.spigot.modules.show.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import lombok.Getter;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

public class Show {

    @Getter private String showName;
    @Getter private Set<ShowCue> cueList = new HashSet<>();
    private transient ScheduledExecutorService showTimer = null;
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

    public Boolean isRunning() {
        return showTimer != null;
    }

    public void start() {
        if (isRunning()) return;
        lastTaskTime = 1L;

        showTimer = Executors.newScheduledThreadPool(1);

        for (ShowCue cue : cueList) {
            showTimer.schedule(() -> cue.getTask().run(), cue.getTimestamp(), TimeUnit.MILLISECONDS);
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
        }, lastTaskTime + 50, TimeUnit.MILLISECONDS);

    }

    public void updateLastTime() {
        for (ShowCue cue : cueList) {
            if (lastTaskTime < cue.getTimestamp()) lastTaskTime = cue.getTimestamp();
        }
    }

    public void stop() {
        showTimer.shutdownNow();
        showTimer = null;
    }

    public Show save() {
        Charset charset = Charset.forName("UTF-8");
        try  {
            BufferedWriter writer = Files.newBufferedWriter(new File(OpenAudioMcSpigot.getInstance().getDataFolder(), showName.toLowerCase() + ".json").toPath(), charset);
            String input = toString();
            writer.write(input);
            writer.flush();
            writer.close();
        } catch (IOException x) {
            System.err.format("IOException: %s%n", x);
        }
        return this;
    }
}
