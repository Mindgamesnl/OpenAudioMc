package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.state.interfaces.State;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StateChangeEvent extends AudioEvent {

    private State oldState;
    private State newState;

}
