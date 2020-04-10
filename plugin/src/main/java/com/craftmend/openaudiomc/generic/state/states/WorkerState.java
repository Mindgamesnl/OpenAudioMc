package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;

public class WorkerState implements State {

    @Override
    public String getDescription() {
        return "This server is running in offlinemode. OpenAudioMc will only function if you also install the plugin on your proxy, you can read more about it here: https://help.openaudiomc.net/#bungeecord";
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
