package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import lombok.Getter;
import lombok.Setter;

public class ClientRequestVoiceEvent extends AudioEvent {

    @Setter
    @Getter
    private boolean canceled = false;
    @Getter
    private ClientConnection requester;

    public ClientRequestVoiceEvent(ClientConnection clientConnection) {
        this.requester = clientConnection;
    }
}
