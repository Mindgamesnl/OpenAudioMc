package com.craftmend.openaudiomc.spigot.modules.proxy.enums;

import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.spigot.modules.proxy.service.ProxyNetworkingService;
import lombok.Getter;

public enum ClientMode {

    STAND_ALONE(DefaultNetworkingService.class),
    NODE(ProxyNetworkingService.class),
    ;

    @Getter private Class<? extends NetworkingService> serviceClass;
    ClientMode(Class<? extends NetworkingService> networkingServiceClass) {
        this.serviceClass = networkingServiceClass;
    }
}
