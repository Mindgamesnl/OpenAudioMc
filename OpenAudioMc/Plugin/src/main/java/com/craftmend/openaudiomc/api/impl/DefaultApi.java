package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.interfaces.*;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

@NoArgsConstructor
@Deprecated
public class DefaultApi implements AudioApi {

    private static DefaultApi instance;
    private final WorldApiImpl worldApi = new WorldApiImpl();
    private final MediaApiImpl mediaApi = new MediaApiImpl();
    private final RegistryApiImpl registryApi = new RegistryApiImpl();

    @Deprecated
    public static AudioApi i() {
        if (instance != null) return instance;
        instance = new DefaultApi();
        return instance;
    }

    @Override
    @Deprecated
    public Client getClient(UUID uuid) {
        return OpenAudioMc.getService(NetworkingService.class).getClient(uuid);
    }

    @Override
    @Deprecated
    public boolean isClientConnected(UUID uuid) {
        return getClient(uuid).isConnected();
    }

    @Override
    @Deprecated
    public ApiEventDriver getEventDriver() {
        return OpenAudioMc.getInstance().getApiEventDriver();
    }

    @Override
    @Deprecated
    public Collection<Client> getAllClients() {
        return new ArrayList<>(OpenAudioMc.getService(NetworkingService.class).getClients());
    }

    @Override
    @Deprecated
    public WorldApi getWorldApi() {
        return worldApi;
    }

    @Override
    @Deprecated
    public MediaApi getMediaApi() {
        return mediaApi;
    }

    @Override
    @Deprecated
    public RegistryApi getRegistryApi() {
        return registryApi;
    }
}
