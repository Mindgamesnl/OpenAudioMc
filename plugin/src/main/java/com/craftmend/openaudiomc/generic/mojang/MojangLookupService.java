package com.craftmend.openaudiomc.generic.mojang;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.mojang.store.MojangProfile;
import com.craftmend.openaudiomc.generic.networking.rest.Task;
import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.Instant;

@NoArgsConstructor
public class MojangLookupService extends Service {

    @Inject
    private TaskService taskService;
    @Getter private Repository<MojangProfile> profileRepository;

    @Inject
    public MojangLookupService(DatabaseService databaseService, TaskService ts, OpenAudioMc openAudioMc) {
        profileRepository = databaseService.getRepository(MojangProfile.class);
        ts.scheduleAsyncRepeatingTask(() -> {
            OpenAudioLogger.toConsole("Starting mojang cleanup, this can take a while...");
            // check every hour if the server is empty
            if (openAudioMc.getInvoker().getUserHooks().getOnlineUsers().isEmpty()) {
                cleanup();
            }
            OpenAudioLogger.toConsole("Finished cleanup");
        }, 36000 * 20, 36000 * 20);
        // once every 10 bloody hours
    }

    private void cleanup() {
        int removed = 0;
        OpenAudioLogger.toConsole("Purging old accounts of inactive players");
        for (MojangProfile value : profileRepository.values()) {
            if (value.getLastSeen() == null || Duration.between(value.getLastSeen(), Instant.now()).getSeconds() > 604800) {
                removed++;
                profileRepository.delete(value);
            }
        }
        OpenAudioLogger.toConsole("Removed the profile of " + removed + " players");
    }

    public void save(User user) {
        taskService.runAsync(() -> {
            MojangProfile previous = profileRepository.getWhere("uuid", user.getUniqueId());
            if (previous == null) {
                profileRepository.save(new MojangProfile(user.getName(), user.getUniqueId(), Instant.now()));
                return;
            }
            previous.setName(user.getName());
            previous.setLastSeen(Instant.now());
            profileRepository.save(previous);
        });
    }

    public Task<MojangProfile> getByName(String name) {
        Task<MojangProfile> task = new Task<>();
        taskService.runAsync(() -> {
            MojangProfile mojangProfile = profileRepository.getWhere("name", name.toLowerCase());
            if (mojangProfile == null) {
                task.fail(ErrorCode.NOT_FOUND);
                return;
            }
            task.finish(mojangProfile);
        });
        return task;
    }

}
