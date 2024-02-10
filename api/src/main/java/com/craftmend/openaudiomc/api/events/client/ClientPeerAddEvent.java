package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.CancellableClientEvent;
import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientPeerAddEvent extends CancellableClientEvent {

    private Client peer;
    private VoicePeerOptions options;

    /**
     * Create a new client event
     *
     * @param client  the client that this event is about
     * @param peer    the peer that was added
     * @param options the options that were used to add the peer
     */
    public ClientPeerAddEvent(Client client, Client peer, VoicePeerOptions options) {
        super(client);
        this.peer = peer;
        this.options = options;
    }
}
