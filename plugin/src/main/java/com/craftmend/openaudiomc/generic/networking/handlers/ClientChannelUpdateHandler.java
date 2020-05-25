package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientUpdateChannelListPayload;

public class ClientChannelUpdateHandler extends PayloadHandler<ClientUpdateChannelListPayload> {

    @Override
    public void onReceive(ClientUpdateChannelListPayload payload) {
        Authenticatable authenticatable = findSession(payload.getClient());

        if (authenticatable instanceof ClientConnection) {
            ClientConnection client = (ClientConnection) authenticatable;
            
            try {
                client.getMixTracker().submitChannels(payload.getTracks());
            } catch (IllegalAccessException e) {
                e.printStackTrace();
                authenticatable.kickConnection();
            }
        }
    }
}
