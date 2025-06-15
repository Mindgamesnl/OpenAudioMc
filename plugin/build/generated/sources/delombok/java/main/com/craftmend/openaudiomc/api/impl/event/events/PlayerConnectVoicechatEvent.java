package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.ClientEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;

@EventSupportFlag(support = EventSupport.EVERYWHERE)
@Deprecated
public class PlayerConnectVoicechatEvent extends AudioEvent implements ClientEvent {
    private ClientConnection client;

    public ClientConnection getClient() {
        return this.client;
    }

    public PlayerConnectVoicechatEvent() {
    }

    public PlayerConnectVoicechatEvent(final ClientConnection client) {
        this.client = client;
    }
}
