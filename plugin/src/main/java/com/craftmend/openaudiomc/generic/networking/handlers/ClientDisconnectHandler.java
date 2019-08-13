package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientDisconnectPayload;

public class ClientDisconnectHandler extends PayloadHandler<ClientDisconnectPayload> {

    @Override
    public void onReceive(ClientDisconnectPayload payload) {
        ClientConnection client = OpenAudioMc.getInstance().getNetworkingService().getClient(payload.getClient());
        if (client != null) client.onDisconnect();
    }
}
