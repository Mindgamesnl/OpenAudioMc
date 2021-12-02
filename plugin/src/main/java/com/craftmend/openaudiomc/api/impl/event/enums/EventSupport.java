package com.craftmend.openaudiomc.api.impl.event.enums;

import lombok.Getter;

public enum EventSupport {

    UNKNOWN("Failed to fetch event support for this event"),
    SPIGOT_ONLY("This event is only available on spigot API instances"),
    PROXY_ONLY("This feature is only available through the proxy API instance"),
    ONLY_PROXY_IF_AVAILABLE("This feature is blocked in the spigot API because the proxy has taken over functionality, please use the proxy API."),
    EVERYWHERE("This error should never appear, since this event is supported everywhere");

    @Getter
    private final String errorMessage;

    EventSupport(String message) {
        this.errorMessage = message;
    }
}
