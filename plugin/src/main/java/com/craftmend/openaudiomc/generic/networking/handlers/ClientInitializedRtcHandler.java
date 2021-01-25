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

            // is it an event, or general?
            if (payload.getEvent() == null) {
                // general status
                if (payload.isEnabled()) {
                    cc.setConnectedToRtc(true);
                    cc.getClientRtcManager().setMicrophoneEnabled(true);
                    cc.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_SETUP.getString()));
                } else {
                    cc.getClientRtcManager().setMicrophoneEnabled(false);
                    cc.setConnectedToRtc(false);
                }
            } else {
                // handle event
                switch (payload.getEvent()) {
                    case MICROPHONE_MUTED: {
                        cc.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_MIC_MUTE.getString()));
                        cc.getClientRtcManager().setMicrophoneEnabled(false);
                        break;
                    }

                    case MICROPHONE_UNMUTE: {
                        cc.getPlayer().sendMessage(Platform.translateColors(StorageKey.MESSAGE_VC_MIC_UNMUTE.getString()));
                        cc.getClientRtcManager().setMicrophoneEnabled(true);
                        break;
                    }
                }
            }
        } else {
            // you don't even have volume
            authenticatable.kickConnection();
        }
    }
}
