package com.craftmend.openaudiomc.generic.networking.abstracts;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;

import java.util.UUID;

public abstract class PayloadHandler<E> {

    /**
     * used for handlers
     * you can ignore the unchecked cast, thats because this class does not have
     * a final pre defined type, but it's E because you can use anything really, it's only an instance AbstractPacket
     * @param packet packet
     */
    public void trigger(AbstractPacket packet) {
        onReceive((E) packet.getData());
    }

    public abstract void onReceive(E payload);

    protected Authenticatable findSession(UUID id) {
        ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(id);
        return clientConnection;
    }

}
