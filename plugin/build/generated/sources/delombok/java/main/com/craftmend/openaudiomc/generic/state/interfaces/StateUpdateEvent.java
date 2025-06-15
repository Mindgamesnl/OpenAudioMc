package com.craftmend.openaudiomc.generic.state.interfaces;

public interface StateUpdateEvent {

    void run(State oldState, State newState);

}
