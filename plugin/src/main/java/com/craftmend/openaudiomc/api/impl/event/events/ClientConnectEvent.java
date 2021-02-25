package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import lombok.Getter;
import lombok.Setter;

public class ClientConnectEvent extends AudioEvent {

    @Getter
    private ClientConnection client;

    public ClientConnectEvent(ClientConnection clientConnection) {
        this.client = clientConnection;
    }
}
