package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;

public class IdleState implements State {
    private String description = "No message provided";

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

    public IdleState() {
    }

    public IdleState(final String description) {
        this.description = description;
    }
}
