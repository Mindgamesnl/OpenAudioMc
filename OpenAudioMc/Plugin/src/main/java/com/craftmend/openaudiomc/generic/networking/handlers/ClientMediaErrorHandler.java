package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientFailedMediaPayload;

public class ClientMediaErrorHandler extends PayloadHandler<ClientFailedMediaPayload> {

    @Override
    public void onReceive(ClientFailedMediaPayload payload) {
        Authenticatable authenticatable = findSession(payload.getClient());
        if (payload.getMediaError() == null) {
            authenticatable.kickConnection();
            return;
        }

        authenticatable.handleError(payload.getMediaError(), payload.getSource());
    }
}
