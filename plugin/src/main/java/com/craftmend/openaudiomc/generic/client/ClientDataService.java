package com.craftmend.openaudiomc.generic.client;

import com.craftmend.openaudiomc.generic.client.store.ClientDataStore;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.networking.rest.Task;
import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@NoArgsConstructor
public class ClientDataService extends Service {

    @Inject
    private DatabaseService db;
    @Inject
    private TaskService taskService;

    private final Map<UUID, ClientDataStore> storeCache = new HashMap<>();

    public Task<ClientDataStore> getClientData(UUID owner, boolean store, boolean createEmpty) {
        Task<ClientDataStore> task = new Task<>();
        taskService.runAsync(() -> {
            ClientDataStore cds = db.getRepository(ClientDataStore.class).get(owner.toString());
            if (cds == null && !createEmpty) {
                task.fail(ErrorCode.NOT_FOUND);
                return;
            } else if (cds == null) {
                cds = new ClientDataStore();
                if (store == true) {
                    db.getRepository(ClientDataStore.class).save(owner.toString(), cds);
                }
            }
            if (store) {
                storeCache.put(owner, cds);
            }
            task.finish(cds);
        });
        return task;
    }

    public void dropFromCache(UUID id) {
        storeCache.remove(id);
    }

    public void save(ClientDataStore data, UUID id) {
        db.getRepository(ClientDataStore.class).save(id.toString(), data);
    }
}
