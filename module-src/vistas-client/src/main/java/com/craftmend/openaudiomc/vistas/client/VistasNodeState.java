package com.craftmend.openaudiomc.vistas.client;

import com.craftmend.openaudiomc.generic.state.interfaces.State;

public class VistasNodeState implements State {
    @Override
    public String getDescription() {
        return "OpenAudioMc is being managed by Vistas";
    }

    @Override
    public boolean isConnected() {
        return true;
    }

    @Override
    public boolean canConnect() {
        return false;
    }
}
