package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.ClientEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * This event gets called whenever a {@link ClientConnection} opens the web client.
 * This event gets called on all platforms (so it runs independently on spigot, your proxy, etc)
 */
@NoArgsConstructor
@EventSupportFlag(support = EventSupport.EVERYWHERE)
@Deprecated
public class ClientConnectEvent extends AudioEvent implements ClientEvent {

    @Getter
    private ClientConnection client;

    public ClientConnectEvent(ClientConnection clientConnection) {
        this.client = clientConnection;
    }

}
