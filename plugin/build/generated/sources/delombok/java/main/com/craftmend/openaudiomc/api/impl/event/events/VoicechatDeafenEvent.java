package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.ClientEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;

/**
 * This is a simple event that gets called whenever a player explicitly mutes their microphone
 * (through a command or the web client)
 */
@EventSupportFlag(support = EventSupport.EVERYWHERE)
@Deprecated
public class VoicechatDeafenEvent extends AudioEvent implements ClientEvent {
    private ClientConnection client;

    public ClientConnection getClient() {
        return this.client;
    }

    public VoicechatDeafenEvent() {
    }

    public VoicechatDeafenEvent(final ClientConnection client) {
        this.client = client;
    }
}
