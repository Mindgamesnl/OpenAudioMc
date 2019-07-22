package com.craftmend.openaudiomc.generic.state;

import com.craftmend.openaudiomc.generic.state.interfaces.State;
import com.craftmend.openaudiomc.generic.state.states.BootingState;
import lombok.Getter;

public class StateService {

    @Getter private State currentState = new BootingState();

    public void setState(State state) {
        // update class
        this.currentState = state;
    }

}
