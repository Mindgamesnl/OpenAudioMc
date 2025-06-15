package com.craftmend.openaudiomc.spigot.modules.proxy.enums;

import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.spigot.modules.proxy.service.ProxyNetworkingService;

public enum OAClientMode {
    STAND_ALONE(DefaultNetworkingService.class), NODE(ProxyNetworkingService.class);
    private final Class<? extends NetworkingService> serviceClass;

    OAClientMode(Class<? extends NetworkingService> networkingServiceClass) {
        this.serviceClass = networkingServiceClass;
    }

    public Class<? extends NetworkingService> getServiceClass() {
        return this.serviceClass;
    }
}
