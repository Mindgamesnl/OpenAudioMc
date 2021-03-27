package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import lombok.Getter;
import lombok.Setter;

/**
 * This event gets called whenever a {@link ClientConnection} opens the web client.
 * This event gets called on all platforms (so it runs independently on spigot, your proxy, etc)
 */
public class ClientConnectEvent extends AudioEvent {

    @Getter
    private ClientConnection client;

    public ClientConnectEvent(ClientConnection clientConnection) {
        this.client = clientConnection;
    }
}
