package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.session.ClientAuth;
import com.craftmend.openaudiomc.api.media.MediaError;
import com.craftmend.openaudiomc.generic.networking.packets.PacketSocketKickClient;
import com.craftmend.openaudiomc.api.user.User;

public interface Authenticatable {

    void onConnect();
    void onDisconnect();
    boolean isConnected();
    User getOwner();
    ClientAuth getAuth();
    void handleError(MediaError error, String source);

    default void kickConnection() {
        OpenAudioMc.getService(NetworkingService.class).send(this, new PacketSocketKickClient());
    }

}
