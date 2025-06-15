package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;

/**
 * This event is called whenever a player explicitly mutes their microphone
 */
public class MicrophoneMuteEvent extends ClientEvent {
    /**
     * This is a simple event that gets called whenever a player explicitly mutes their microphone
     *
     * @param client the client that this event is about
     */
    public MicrophoneMuteEvent(Client client) {
        super(client);
    }
}
