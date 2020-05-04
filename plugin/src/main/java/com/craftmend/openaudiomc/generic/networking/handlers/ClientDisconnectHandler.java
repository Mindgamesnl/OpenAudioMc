package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.client.objects.plus.PlusSocketSession;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientDisconnectPayload;

import java.util.UUID;

public class ClientDisconnectHandler extends PayloadHandler<ClientDisconnectPayload> {

    @Override
    public void onReceive(ClientDisconnectPayload payload) {
        Authenticatable authenticatable = findSession(payload.getClient());
        if (authenticatable != null) authenticatable.onDisconnect();
    }

    private Authenticatable findSession(UUID id) {
        ClientConnection clientConnection = OpenAudioMc.getInstance().getNetworkingService().getClient(id);
        if (clientConnection != null) return clientConnection;
        PlusSocketSession plusSocketSession = OpenAudioMc.getInstance().getPlusService().getConnectionManager().getBySessionId(id);
        return plusSocketSession;
    }
}
