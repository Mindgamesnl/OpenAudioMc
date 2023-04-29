package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;

public class WorkerState implements State {

    @Override
    public String getDescription() {
        return "This server is running in offlinemode. You either need to force whitelist this mode in the config or setup the plugin on your proxy. Full installation instructions can be found on https://openaudiomc.net/docs/installation";
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
