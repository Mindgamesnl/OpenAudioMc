package com.craftmend.openaudiomc.spigot.modules.proxy.enums;

import com.craftmend.openaudiomc.generic.networking.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingService;
import com.craftmend.openaudiomc.spigot.modules.proxy.service.ProxyNetworkingService;

public enum ClientMode {

    STAND_ALONE(NetworkingService.class),
    NODE(ProxyNetworkingService.class),
    ;

    public Class<? extends INetworkingService> serviceClass;
    ClientMode(Class<? extends INetworkingService> networkingServiceClass) {
        this.serviceClass = networkingServiceClass;
    }
}
