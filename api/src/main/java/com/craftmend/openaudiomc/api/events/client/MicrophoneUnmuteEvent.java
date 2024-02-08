package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;

public class MicrophoneUnmuteEvent extends ClientEvent {
    /**
     * This is a simple event that gets called whenever a player explicitly unmutes their microphone
     *
     * @param client the client that this event is about
     */
    public MicrophoneUnmuteEvent(Client client) {
        super(client);
    }
}
