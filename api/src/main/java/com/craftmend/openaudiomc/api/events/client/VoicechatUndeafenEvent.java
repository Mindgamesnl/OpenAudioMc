package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;

public class VoicechatUndeafenEvent extends ClientEvent {
    /**
     * This is a simple event that gets called whenever a player explicitly undeafens their audio
     *
     * @param client the client that this event is about
     */
    public VoicechatUndeafenEvent(Client client) {
        super(client);
    }
}
