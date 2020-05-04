package com.craftmend.openaudiomc.generic.networking.interfaces;

import java.util.UUID;

public interface Authenticatable {

    boolean isTokenCorrect(String token);
    void onConnect();
    void onDisconnect();
    boolean getIsConnected();
    UUID getOwnerUUID();

}
