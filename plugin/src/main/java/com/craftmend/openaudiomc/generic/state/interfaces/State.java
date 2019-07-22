package com.craftmend.openaudiomc.generic.state.interfaces;

public interface State {

    String getDescription();
    Boolean isConnected();
    Boolean canConnect();

}
