package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * This event fires whenever the timeservice gets updated with the current relay server data.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TimeServiceUpdateEvent extends AudioEvent {

    private TimeService timeService;

    @Override
    public EventSupport getSupport() {
        return EventSupport.ONLY_PROXY_IF_AVAILABLE;
    }
}
