package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientUpdateChannelListPayload;

public class ClientChannelUpdateHandler extends PayloadHandler<ClientUpdateChannelListPayload> {

    @Override
    public void onReceive(ClientUpdateChannelListPayload payload) {
       // deprecated
    }
}
