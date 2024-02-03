package com.craftmend.openaudiomc.generic.api.implementaions;

import com.craftmend.openaudiomc.api.ClientApi;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

@AllArgsConstructor
public class ClientApiImpl implements ClientApi {

    private NetworkingService networkingService;

    @Nullable
    @Override
    public Client getClient(UUID clientUuid) {
        return networkingService.getClient(clientUuid);
    }

    @NotNull
    @Override
    public Collection<Client> getAllClients() {
        return new ArrayList<>(networkingService.getClients());
    }

    @Override
    public boolean isConnected(UUID uuid) {
        Client c = getClient(uuid);
        return c != null && c.isConnected();
    }
}
