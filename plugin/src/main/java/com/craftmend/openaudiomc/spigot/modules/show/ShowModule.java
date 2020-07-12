package com.craftmend.openaudiomc.spigot.modules.show;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.plus.PlusSocketSession;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.voicechat.api.util.Task;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import com.craftmend.openaudiomc.spigot.modules.show.networking.rest.ShowUploadBody;
import com.craftmend.openaudiomc.spigot.modules.show.networking.rest.ShowUploadResponse;
import com.craftmend.openaudiomc.spigot.modules.show.objects.Show;
import com.craftmend.openaudiomc.spigot.modules.show.runnables.CommandRunnable;
import org.bukkit.World;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ShowModule {

    private OpenAudioMc openAudioMc;
    private Map<String, Class<?>> taskTypes = new HashMap<>();
    private Map<String, Show> showCache = new HashMap<>();

    public ShowModule(OpenAudioMcSpigot openAudioMcSpigot) {
        // register default type
        taskTypes.put("command", CommandRunnable.class);
        openAudioMc = OpenAudioMc.getInstance();
    }

    public Task<ShowUploadResponse> uploadShow(Show show, ClientConnection owner) {
        // upload show to the web editor and return the KEY
        Task<ShowUploadResponse> task = new Task<>();

        openAudioMc.getTaskProvider().runAsync(() -> {
            // prepare object
            ShowUploadBody body = new ShowUploadBody();

            // create session
            PlusSocketSession session = openAudioMc.getPlusService().getConnectionManager().createSessionForClient(owner);

            body.setSession(session);
            body.setName(owner.getOwnerName());
            body.setPlayerUuid(owner.getOwnerUUID().toString());
            body.setName(show.getShowName());
            body.setShow(show);

            // push
            RestRequest restRequest = new RestRequest(RestEndpoint.WORKER_SHOWS_UPLOAD);
            restRequest.setBody(body);

            // execute here since we're already in an async thread
            ApiResponse response = restRequest.executeSync();

            if (!response.getErrors().isEmpty()) {
                task.fail(response.getErrors().get(0).getCode());
                return;
            }

            // probably a string, but we might change the response later to include Time Till Death etc
            task.success(response.getResponse(ShowUploadResponse.class));
        });

        return task;
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

}
