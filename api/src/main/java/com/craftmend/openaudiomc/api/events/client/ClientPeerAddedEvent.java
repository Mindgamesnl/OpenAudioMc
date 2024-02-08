package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;
import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientPeerAddedEvent extends ClientEvent {

    private Client peer;
    private VoicePeerOptions options;

    /**
     * Create a new client event
     *
     * @param client  the client that this event is about
     * @param peer    the peer that was added
     * @param options the options that were used to add the peer
     */
    public ClientPeerAddedEvent(Client client, Client peer, VoicePeerOptions options) {
        super(client);
        this.peer = peer;
        this.options = options;
    }
}
