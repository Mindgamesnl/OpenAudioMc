package com.craftmend.openaudiomc.generic.networking.handlers;

import com.craftmend.openaudiomc.generic.networking.abstracts.PayloadHandler;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientOpenedRtcPayload;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;

public class ClientInitializedRtcHandler extends PayloadHandler<ClientOpenedRtcPayload> {

    @Override
    public void onReceive(ClientOpenedRtcPayload payload) {
        Authenticatable authenticatable = findSession(payload.getClient());
        if (authenticatable instanceof ClientConnection) {
            ClientConnection cc = ((ClientConnection) authenticatable);
            cc.setConnectedToRtc(true);
            cc.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_SETUP.getString()));
        } else {
            // you don't even have volume
            authenticatable.kickConnection();
        }
    }
}
