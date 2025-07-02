package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;
import lombok.Getter;

import java.util.UUID;

public class ReconnectingState implements State {

    public static final int MAX_ATTEMPTS = 7;
    @Getter private int attempts = 0;

    @Getter private UUID stateId = UUID.randomUUID();

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
}
