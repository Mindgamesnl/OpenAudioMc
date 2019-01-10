package com.craftmend.openaudiomc.services.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.services.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.services.networking.payloads.ClientDisconnectPayload;
import com.craftmend.openaudiomc.modules.players.objects.Client;

public class ClientDisconnectHandler extends PayloadHandler<ClientDisconnectPayload> {

    @Override
    public void onReceive(ClientDisconnectPayload payload) {
        Client client = OpenAudioMc.getInstance().getPlayerModule().getClient(payload.getClient());
        if (client != null) client.onDisconnect();
    }
}
