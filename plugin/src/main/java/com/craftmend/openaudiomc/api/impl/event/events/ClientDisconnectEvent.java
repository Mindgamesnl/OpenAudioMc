package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import lombok.Getter;

public class ClientDisconnectEvent extends AudioEvent {

    @Getter
    private ClientConnection client;

    public ClientDisconnectEvent(ClientConnection clientConnection) {
        this.client = clientConnection;
    }
}
