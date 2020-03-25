package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;

public class ConnectingState implements State {

    @Override
    public String getDescription() {
        return "OpenAudioMc is attempting to connect to the Api Service";
    }

    @Override
    public boolean isConnected() {
        return false;
    }

    @Override
    public boolean canConnect() {
        return false;
    }
}
