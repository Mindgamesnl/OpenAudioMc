package com.craftmend.openaudiomc.spigot.services.state;

import com.craftmend.openaudiomc.spigot.services.state.interfaces.State;
import com.craftmend.openaudiomc.spigot.services.state.states.BootingState;
import lombok.Getter;

public class StateService {

    @Getter private State currentState = new BootingState();

    public void setState(State state) {
        // update class
        this.currentState = state;
    }

}
