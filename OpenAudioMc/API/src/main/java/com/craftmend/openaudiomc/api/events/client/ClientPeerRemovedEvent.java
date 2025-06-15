package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;
import lombok.Getter;
import lombok.Setter;

@Getter
/**
 * This event is called whenever a peer is being removed from the client
 */
public class ClientPeerRemovedEvent extends ClientEvent {

    private Client peer;

    /**
     * Create a new client event
     *
     * @param client the client that this event is about
     * @param peer   the peer that was removed
     */
    public ClientPeerRemovedEvent(Client client, Client peer) {
        super(client);
        this.peer = peer;
    }
}
