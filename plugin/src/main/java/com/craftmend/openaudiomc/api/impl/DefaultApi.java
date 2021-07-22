package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.interfaces.*;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

public class DefaultApi implements AudioApi {

    private final OpenAudioMc pluginInstance;
    private final WorldApiImpl worldApi = new WorldApiImpl();
    private final MediaApiImpl mediaApi = new MediaApiImpl();
    private final RegistryApiImpl registryApi = new RegistryApiImpl();

    public DefaultApi(OpenAudioMc booted) {
        this.pluginInstance = booted;
    }

    @Override
    public Client getClient(UUID uuid) {
        return OpenAudioMc.getService(NetworkingService.class).getClient(uuid);
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
