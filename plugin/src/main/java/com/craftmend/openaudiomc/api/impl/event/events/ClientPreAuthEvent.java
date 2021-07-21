package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@EventSupportFlag(support = EventSupport.ONLY_PROXY_IF_AVAILABLE)
public class ClientPreAuthEvent extends AudioEvent {

    @Setter
    @Getter
    private boolean canceled = false;
    @Getter
    private Authenticatable requester;
    @Getter
    private String token;

    public ClientPreAuthEvent(Authenticatable authenticatable, String token) {
        this.requester = authenticatable;
        this.token = token;
    }

}
