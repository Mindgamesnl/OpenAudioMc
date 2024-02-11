package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.CancellableClientEvent;

/**
 * This event is called whenever a client enables voice chat.
 * This event is cancellable, and if cancelled, the client will not be able to enable voice chat (not showing the tab)
 */
public class ClientEnableVoiceEvent extends CancellableClientEvent {

    public ClientEnableVoiceEvent(Client client) {
        super(client);
    }

}
