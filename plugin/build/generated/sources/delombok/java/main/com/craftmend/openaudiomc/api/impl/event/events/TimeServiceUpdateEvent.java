package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.media.time.TimeService;

/**
 * This event fires whenever the timeservice gets updated with the current relay server data.
 */
@EventSupportFlag(support = EventSupport.ONLY_PROXY_IF_AVAILABLE)
@Deprecated
public class TimeServiceUpdateEvent extends AudioEvent {
    private TimeService timeService;

    public TimeService getTimeService() {
        return this.timeService;
    }

    public TimeServiceUpdateEvent() {
    }

    public TimeServiceUpdateEvent(final TimeService timeService) {
        this.timeService = timeService;
    }
}
