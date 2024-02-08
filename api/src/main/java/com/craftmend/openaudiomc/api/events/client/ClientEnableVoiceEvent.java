package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.CancellableClientEvent;

public class ClientEnableVoiceEvent extends CancellableClientEvent {

    public ClientEnableVoiceEvent(Client client) {
        super(client);
    }

}
