package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.impl.event.enums.TickEventType;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;

@EventSupportFlag(support = EventSupport.SPIGOT_ONLY)
@Deprecated
public class VoiceChatPeerTickEvent extends AudioEvent {
    private TickEventType when;

    public TickEventType getWhen() {
        return this.when;
    }

    public VoiceChatPeerTickEvent() {
    }

    public VoiceChatPeerTickEvent(final TickEventType when) {
        this.when = when;
    }
}
