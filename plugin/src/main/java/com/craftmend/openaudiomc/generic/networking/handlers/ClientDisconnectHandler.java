package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientDisconnectPayload;
import com.craftmend.openaudiomc.spigot.modules.players.objects.Client;

public class ClientDisconnectHandler extends PayloadHandler<ClientDisconnectPayload> {

    @Override
    public void onReceive(ClientDisconnectPayload payload) {
        Client client = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(payload.getClient());
        if (client != null) client.onDisconnect();
    }
}
