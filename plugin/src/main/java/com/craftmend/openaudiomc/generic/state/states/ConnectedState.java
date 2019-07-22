package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ConnectedState implements State {

    private String description = "Connected and authenticated to the OpenAudioMc API server";

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public Boolean isConnected() {
        return true;
    }

    @Override
    public Boolean canConnect() {
        return false;
    }
}
