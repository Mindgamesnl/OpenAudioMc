package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientDisconnectPayload;

public class ClientDisconnectHandler extends PayloadHandler<ClientDisconnectPayload> {

    @Override
    public void onReceive(ClientDisconnectPayload payload) {
        Authenticatable authenticatable = findSession(payload.getClient());
        if (authenticatable != null) {
            authenticatable.onDisconnect();
            for (INetworkingEvents event : OpenAudioMc.getInstance().getNetworkingService().getEvents()) {
                event.onClientClose(authenticatable);
            }
        }
    }
}
