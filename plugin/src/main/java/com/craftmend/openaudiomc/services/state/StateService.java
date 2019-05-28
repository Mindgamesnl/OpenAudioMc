package com.craftmend.openaudiomc.services.state;

import com.craftmend.openaudiomc.services.state.interfaces.State;
import com.craftmend.openaudiomc.services.state.states.BootingState;
import lombok.Getter;

public class StateService {

    @Getter private State currentState = new BootingState();

    public StateService() {

    }

    public void setState(State state) {
        this.currentState = state;
    }

}
