package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;

/**
 * This event is called whenever a client is successfully connected, or a player switched to this
 * server with the web client open
 */
public class ClientConnectEvent extends ClientEvent {
    /**
     * Create a new client connect event, representing a client that has connected to the web client
     *
     * @param client the client that this event is about
     */
    public ClientConnectEvent(Client client) {
        super(client);
    }
}
