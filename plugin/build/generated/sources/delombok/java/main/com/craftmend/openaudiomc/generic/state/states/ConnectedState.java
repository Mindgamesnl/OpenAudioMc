package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;
import java.util.UUID;

public class ConnectedState implements State {
    private String description = "Connected and authenticated to the OpenAudioMc API server";

    public ConnectedState(String usedRelay) {
        this.usedRelay = usedRelay;
    }

    private String usedRelay;

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public boolean isConnected() {
        return true;
    }

    @Override
    public boolean canConnect() {
        return false;
    }

    public ConnectedState() {
    }

    public ConnectedState(final String description, final String usedRelay) {
        this.description = description;
        this.usedRelay = usedRelay;
    }

    public String getUsedRelay() {
        return this.usedRelay;
    }
}
