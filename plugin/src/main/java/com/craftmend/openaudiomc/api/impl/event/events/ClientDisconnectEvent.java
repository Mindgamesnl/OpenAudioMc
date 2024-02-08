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
 *
 * This could happen after leaving the server, so be careful interacting or trying to query for the player
 * since they might be offline already.
 */
@NoArgsConstructor
@EventSupportFlag(support = EventSupport.EVERYWHERE)
@Deprecated
public class ClientDisconnectEvent extends AudioEvent implements ClientEvent {

    @Getter
    private ClientConnection client;

    public ClientDisconnectEvent(ClientConnection clientConnection) {
        this.client = clientConnection;
    }

}
