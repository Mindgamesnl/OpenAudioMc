package com.craftmend.openaudiomc.generic.mojang;

import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.mojang.store.MojangProfile;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.user.User;

public class MojangLookupService extends Service {

    @Inject
    private TaskService taskService;
    private Repository<MojangProfile> profileRepository;

    @Inject
    public MojangLookupService(DatabaseService databaseService) {
        profileRepository = databaseService.getRepository(MojangProfile.class);
    }

    public void save(User user) {
        taskService.runAsync(() -> {
            profileRepository.save(user.getName().toLowerCase(),
                    new MojangProfile(user.getName(), user.getUniqueId())
            );
        });
    }

}
