package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;

public class ClientDisconnectEvent extends ClientEvent {
    /**
     * Create a new client event that represents a client that has disconnected from the web client
     *
     * @param client the client that this event is about
     */
    public ClientDisconnectEvent(Client client) {
        super(client);
    }
}
