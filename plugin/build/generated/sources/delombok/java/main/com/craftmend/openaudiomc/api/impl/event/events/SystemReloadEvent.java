package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;

@EventSupportFlag(support = EventSupport.EVERYWHERE)
@Deprecated
public class SystemReloadEvent extends AudioEvent {
    public SystemReloadEvent() {
    }
    // no additional data
}
