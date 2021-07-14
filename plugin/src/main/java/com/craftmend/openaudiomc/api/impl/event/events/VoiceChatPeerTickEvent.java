package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.impl.event.enums.TickEventType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoiceChatPeerTickEvent extends AudioEvent {

    private TickEventType when;

    @Override
    public EventSupport getSupport() {
        return EventSupport.SPIGOT_ONLY;
    }

}
