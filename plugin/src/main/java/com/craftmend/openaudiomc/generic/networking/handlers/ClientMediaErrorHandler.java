package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientFailedMediaPayload;

public class ClientMediaErrorHandler extends PayloadHandler<ClientFailedMediaPayload> {

    @Override
    public void onReceive(ClientFailedMediaPayload payload) {
        // deprecated
    }
}
