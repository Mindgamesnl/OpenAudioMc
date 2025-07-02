package com.craftmend.openaudiomc.generic.client;

import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.store.ClientDataStore;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.rest.Task;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.rest.response.SectionError;
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

        // is the client online? then use it
        ClientConnection onlineClient = getService(NetworkingService.class).getClient(owner);

        // before we run off with it, we need to check if this isn't just the instance that requested it
        if (onlineClient != null && onlineClient.getDataCache() != null) {
            taskService.runAsync(() -> task.finish(onlineClient.getDataCache()));
            return task;
        }

        taskService.runAsync(() -> {
            ClientDataStore cds = db.getRepository(ClientDataStore.class).getWhere("owner", owner);
            if (cds == null && !createEmpty) {
                task.fail(SectionError.NOT_FOUND);
                return;
            } else if (cds == null) {
                cds = new ClientDataStore();
                cds.setOwner(owner);
                if (store) {
                    db.getRepository(ClientDataStore.class).save(cds);
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
        if (data == null || id == null) return;
        data.setOwner(id);
        db.getRepository(ClientDataStore.class).save(data);

        // update cache
        if (storeCache.containsKey(id)) {
            storeCache.put(id, data);
        }

        // is the client online? then use it
        ClientConnection onlineClient = getService(NetworkingService.class).getClient(id);

        if (onlineClient != null) {
            onlineClient.setDataCache(data);
        }
    }
}
