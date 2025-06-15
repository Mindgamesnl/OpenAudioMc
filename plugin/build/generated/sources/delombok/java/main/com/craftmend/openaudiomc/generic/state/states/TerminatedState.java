package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;

public class TerminatedState implements State {
    private String description = "The connection got terminated due to inactivity";

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public boolean isConnected() {
        return false;
    }

    @Override
    public boolean canConnect() {
        return true;
    }

    public TerminatedState() {
    }

    public TerminatedState(final String description) {
        this.description = description;
    }
}
