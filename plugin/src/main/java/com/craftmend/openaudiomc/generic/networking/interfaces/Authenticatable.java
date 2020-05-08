package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.packets.PacketSocketKickClient;

import java.util.UUID;

public interface Authenticatable {

    boolean isTokenCorrect(String token);
    void onConnect();
    void onDisconnect();
    boolean getIsConnected();
    UUID getOwnerUUID();

    default void kickConnection() {
        OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketSocketKickClient());
    }

}
