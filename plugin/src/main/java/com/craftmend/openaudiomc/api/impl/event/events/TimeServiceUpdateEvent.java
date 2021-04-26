package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * This event fires whenever the timeservice gets updated with the current relay server data.
 */
@Getter
@AllArgsConstructor
public class TimeServiceUpdateEvent extends AudioEvent {

    private TimeService timeService;

}
