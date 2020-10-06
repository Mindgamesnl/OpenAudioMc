package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientChangedVolumePayload;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientEnabledHuePayload;

public class ClientChangedVolumeHandler extends PayloadHandler<ClientChangedVolumePayload> {

    @Override
    public void onReceive(ClientChangedVolumePayload payload) {
        // they enabled hue!
        Authenticatable authenticatable = findSession(payload.getClient());
        if (authenticatable instanceof ClientConnection) {
            ((ClientConnection) authenticatable).updatedVolume(payload.getVolume());
        } else {
            // you don't even have volume
            authenticatable.kickConnection();
        }
    }
}
