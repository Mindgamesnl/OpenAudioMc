package com.craftmend.openaudiomc.generic.state.states;

import com.craftmend.openaudiomc.generic.state.interfaces.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
public class ConnectedState implements State {

    private String description = "Connected and authenticated to the OpenAudioMc API server";

    public ConnectedState(UUID usedRelay) {
        this.usedRelay = usedRelay;
    }

    @Getter private UUID usedRelay;

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
}
