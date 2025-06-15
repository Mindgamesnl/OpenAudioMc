package com.craftmend.openaudiomc.generic.events.events;

import com.craftmend.openaudiomc.api.events.BaseEvent;
import com.craftmend.openaudiomc.generic.state.interfaces.State;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
public class StateChangeEvent extends BaseEvent {

    private State oldState;
    private State newState;

}
