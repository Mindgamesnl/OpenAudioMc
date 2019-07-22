package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;

public class ConnectingState implements State {

    @Override
    public String getDescription() {
        return "OpenAudioMc is attempting to connect to the Api Service";
    }

    @Override
    public Boolean isConnected() {
        return false;
    }

    @Override
    public Boolean canConnect() {
        return false;
    }
}
