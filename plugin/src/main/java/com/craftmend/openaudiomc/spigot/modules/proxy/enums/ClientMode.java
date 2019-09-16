package com.craftmend.openaudiomc.spigot.modules.proxy.enums;

import com.craftmend.openaudiomc.generic.networking.NetworkingService;
import com.craftmend.openaudiomc.spigot.modules.proxy.service.ProxyNetworkingService;

public enum ClientMode {

    STAND_ALONE(NetworkingService.class),
    NODE(ProxyNetworkingService.class),
    ;

    public Class<?> serviceClass;
    ClientMode(Class<?> networkingServiceClass) {
        this.serviceClass = networkingServiceClass;
    }
}
