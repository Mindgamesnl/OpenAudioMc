package com.craftmend.openaudiomc.generic.service;

import com.craftmend.openaudiomc.OpenAudioMc;

public abstract class Service implements Servicable {

    public void onEnable() {}

    public void onDisable() {
        // unused, but can be overwritten
    }

    public <T extends Servicable> T getService(Class<T> s) {
        if (Service.class.isAssignableFrom(s)) {
            Class<? extends Service> sc = (Class<? extends Service>) s;
            return s.cast(OpenAudioMc.getInstance().getServiceManager().getService(sc));
        }
        return s.cast(OpenAudioMc.getInstance().getServiceManager().resolve(s));
    }


}
