package com.craftmend.openaudiomc.generic.state;

import com.craftmend.openaudiomc.generic.state.interfaces.State;
import com.craftmend.openaudiomc.generic.state.interfaces.StateUpdateEvent;
import com.craftmend.openaudiomc.generic.state.states.BootingState;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class StateService {

    private List<StateUpdateEvent> events = new ArrayList<>();
    @Getter private State currentState = new BootingState();

    public void setState(State state) {
        // update class
        for (StateUpdateEvent event : events) {
            event.run(this.currentState, state);
        }
        this.currentState = state;
    }

    public void addListener(StateUpdateEvent event) {
        this.events.add(event);
    }

}
