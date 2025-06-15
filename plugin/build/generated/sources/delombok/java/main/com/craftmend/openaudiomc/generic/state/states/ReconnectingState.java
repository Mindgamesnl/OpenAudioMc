package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;
import java.util.UUID;

public class ReconnectingState implements State {
    public static final int MAX_ATTEMPTS = 7;
    private int attempts = 0;
    private UUID stateId = UUID.randomUUID();

    @Override
    public String getDescription() {
        return "Attempting to reconnect.. Attempt " + attempts + " of " + MAX_ATTEMPTS;
    }

    @Override
    public boolean isConnected() {
        return false;
    }

    @Override
    public boolean canConnect() {
        return false;
    }

    public void incrementAttempts() {
        attempts++;
    }

    public int getAttempts() {
        return this.attempts;
    }

    public UUID getStateId() {
        return this.stateId;
    }
}
