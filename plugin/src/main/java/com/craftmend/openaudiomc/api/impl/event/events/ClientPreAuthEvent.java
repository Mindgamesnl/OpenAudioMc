package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import lombok.Getter;
import lombok.Setter;

public class ClientPreAuthEvent extends AudioEvent {

    @Setter
    @Getter
    private boolean canceled = false;
    @Getter
    private final Authenticatable requester;
    @Getter
    private final String token;

    public ClientPreAuthEvent(Authenticatable authenticatable, String token) {
        this.requester = authenticatable;
        this.token = token;
    }
}
