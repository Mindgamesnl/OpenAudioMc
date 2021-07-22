package com.craftmend.openaudiomc.spigot.modules.show;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import com.craftmend.openaudiomc.spigot.modules.show.runnables.ActionBarRunnable;
import com.craftmend.openaudiomc.spigot.modules.show.runnables.ChatRunnable;
import com.craftmend.openaudiomc.spigot.modules.show.runnables.CommandRunnable;
import lombok.NoArgsConstructor;
import org.bukkit.World;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.nio.file.Files;
import java.util.*;

@NoArgsConstructor
public class ShowService extends Service {

    @Inject
    private OpenAudioMcSpigot openAudioMcSpigot;

    private final Map<String, Class<?>> taskTypes = new HashMap<>();
    private final Map<String, Show> showCache = new HashMap<>();

    @Override
    public void onEnable() {
        // register default type
        taskTypes.put("command", CommandRunnable.class);
        taskTypes.put("chat", ChatRunnable.class);
        taskTypes.put("actionbar", ActionBarRunnable.class);
    }

    public void addTask(String name, Class<?> executor) {
        taskTypes.put(name.toLowerCase(), executor);
    }

    public Show getShow(String name) {
        String id = name.toLowerCase();
        if (showCache.containsKey(id)) {
            return showCache.get(id);
        } else {
            Show show = fromFile(id);
            if (show != null) showCache.put(id, show);
            return show;
        }
    }

    public Set<String> getTaskTypes() {
        return taskTypes.keySet();
    }

    public Show createShow(String name) {
        // check if it already exists
        if (fromFile(name) != null) return null;

        Show show = new Show(name).save();
        showCache.put(name.toLowerCase(), show);
        return show;
    }

    public Show fromFile(String name) {
        try {
            return OpenAudioMc.getGson().fromJson(new String(Files.readAllBytes(new File(OpenAudioMcSpigot.getInstance().getDataFolder(), name.toLowerCase() + ".json").toPath())), Show.class);
        } catch (IOException e) {
            // ignored
        }
        return null;
    }

    public ShowRunnable createRunnable(String name, String serialized, World context) {
        Class<?> clazz = taskTypes.get(name.toLowerCase());
        if (clazz == null) return null;
        try {
            ShowRunnable runnable = (ShowRunnable) clazz.getConstructor().newInstance();
            runnable.prepare(serialized, context);
            return runnable;
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            // ignored
        }
        return null;
    }

    public List<String> getAllShows() {
        List<String> showNames = new ArrayList<>();
        for (File file : Objects.requireNonNull(OpenAudioMcSpigot.getInstance().getDataFolder().listFiles())) {
            if (file.getName().contains("json")) {
                String name = file.getName();
                name = name.replace(".json", "");
                showNames.add(name);
            }
        }

        // exclude internal json files
        showNames.removeAll(Arrays.asList(
                "persistent",
                "cache"
        ));

        return showNames;
    }

}
