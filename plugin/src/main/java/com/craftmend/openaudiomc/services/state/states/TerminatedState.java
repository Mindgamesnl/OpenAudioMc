package com.craftmend.openaudiomc.services.state.states;

import com.craftmend.openaudiomc.services.state.interfaces.State;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class TerminatedState implements State {

    private String description = "The connection got terminated due to inactivity";

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public Boolean isConnected() {
        return false;
    }

    @Override
    public Boolean canConnect() {
        return true;
    }
}
