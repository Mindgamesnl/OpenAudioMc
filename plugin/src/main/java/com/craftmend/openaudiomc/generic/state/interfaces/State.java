package com.craftmend.openaudiomc.generic.state.interfaces;

public interface State {

    String getDescription();
    boolean isConnected();
    boolean canConnect();

    default String asString() {
        return getClass().getSimpleName() + ": " + getDescription();
    }

}
