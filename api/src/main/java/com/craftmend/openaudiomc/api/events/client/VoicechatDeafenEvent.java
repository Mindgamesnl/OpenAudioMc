package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;

/**
 * This event is called whenever a player explicitly deafens their audio
 */
public class VoicechatDeafenEvent extends ClientEvent {
    /**
     * This is a simple event that gets called whenever a player explicitly deafens their audio
     *
     * @param client the client that this event is about
     */
    public VoicechatDeafenEvent(Client client) {
        super(client);
    }
}
