package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SystemReloadEvent extends AudioEvent {

    @Override
    public EventSupport getSupport() {
        return EventSupport.EVERYWHERE;
    }

}
