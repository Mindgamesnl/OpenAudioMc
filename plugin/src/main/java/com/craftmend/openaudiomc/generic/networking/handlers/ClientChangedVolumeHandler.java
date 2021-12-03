package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientChangedVolumePayload;

public class ClientChangedVolumeHandler extends PayloadHandler<ClientChangedVolumePayload> {

    @Override
    public void onReceive(ClientChangedVolumePayload payload) {
        Authenticatable authenticatable = findSession(payload.getClient());
        if (authenticatable instanceof ClientConnection) {
            ((ClientConnection) authenticatable).getSession().setVolume(payload.getVolume());
        } else {
            // you don't even have volume
            authenticatable.kickConnection();
        }
    }
}
