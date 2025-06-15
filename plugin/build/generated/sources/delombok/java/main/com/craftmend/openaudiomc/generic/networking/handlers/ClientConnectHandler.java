package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientConnectionPayload;

public class ClientConnectHandler extends PayloadHandler<ClientConnectionPayload> {

    @Override
    public void onReceive(ClientConnectionPayload payload) {
        Authenticatable authenticatable = findSession(payload.getUuid());
        if (authenticatable != null) {
            for (INetworkingEvents event : OpenAudioMc.getService(NetworkingService.class).getEvents()) {
                event.onClientOpen(authenticatable);
            }
        }
    }
}
