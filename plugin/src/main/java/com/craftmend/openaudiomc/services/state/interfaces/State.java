package com.craftmend.openaudiomc.services.state.interfaces;

public interface State {

    String getDescription();
    Boolean isConnected();
    Boolean canConnect();

}
