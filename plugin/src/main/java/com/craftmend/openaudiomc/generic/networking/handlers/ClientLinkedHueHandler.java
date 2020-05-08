package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientEnabledHuePayload;

public class ClientLinkedHueHandler extends PayloadHandler<ClientEnabledHuePayload> {

    @Override
    public void onReceive(ClientEnabledHuePayload payload) {
        // they enabled hue!
    }
}
