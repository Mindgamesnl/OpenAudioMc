package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;

public class BootingState implements State {

    @Override
    public String getDescription() {
        return "OpenAudioMc is still starting up";
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
