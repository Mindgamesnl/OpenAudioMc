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
public class DefaultApi implements AudioApi {

    private static DefaultApi instance;
    private final WorldApiImpl worldApi = new WorldApiImpl();
    private final MediaApiImpl mediaApi = new MediaApiImpl();
    private final RegistryApiImpl registryApi = new RegistryApiImpl();

    public static AudioApi i() {
        if (instance != null) return instance;
        instance = new DefaultApi();
        return instance;
    }

    @Override
    public Client getClient(UUID uuid) {
        return OpenAudioMc.getService(NetworkingService.class).getClient(uuid);
    }

    @Override
    public boolean isClientConnected(UUID uuid) {
        return getClient(uuid).isConnected();
    }

    @Override
    public ApiEventDriver getEventDriver() {
        return OpenAudioMc.getInstance().getApiEventDriver();
    }

    @Override
    public Collection<Client> getAllClients() {
        return new ArrayList<>(OpenAudioMc.getService(NetworkingService.class).getClients());
    }

    @Override
    public WorldApi getWorldApi() {
        return worldApi;
    }

    @Override
    public MediaApi getMediaApi() {
        return mediaApi;
    }

    @Override
    public RegistryApi getRegistryApi() {
        return registryApi;
    }
}
