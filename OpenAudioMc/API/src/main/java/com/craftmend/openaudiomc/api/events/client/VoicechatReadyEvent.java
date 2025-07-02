package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;

/**
 * This event is called whenever a client is ready to use voicechat
 */
public class VoicechatReadyEvent extends ClientEvent {
    /**
     * Fired whenever a client is ready to use voicechat
     *
     * @param client the client that this event is about
     */
    public VoicechatReadyEvent(Client client) {
        super(client);
    }
}
