package com.craftmend.openaudiomc.generic.service;

import com.craftmend.openaudiomc.OpenAudioMc;

public abstract class Service {

    public abstract void onEnable();

    public void onDisable() {
        // unused, but can be overwritten
    }

    public <T extends Service> T getService(Class<T> service) {
        return service.cast(OpenAudioMc.getInstance().getServiceManager().getService(service));
    }

}
