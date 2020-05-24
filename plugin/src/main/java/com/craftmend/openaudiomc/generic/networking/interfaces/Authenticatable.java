package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.enums.MediaError;
import com.craftmend.openaudiomc.generic.networking.packets.PacketSocketKickClient;

import java.util.UUID;

public interface Authenticatable {

    boolean isTokenCorrect(String token);
    void onConnect();
    void onDisconnect();
    boolean getIsConnected();
    UUID getOwnerUUID();
    void handleError(MediaError error, String source);

    default void kickConnection() {
        OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketSocketKickClient());
    }

}
