package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;

/**
 * This event is called whenever a client is successfully disconnected, or a player switched to this
 * server with the web client closed
 */
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
