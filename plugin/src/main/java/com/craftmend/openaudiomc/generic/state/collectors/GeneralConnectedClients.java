package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

public class GeneralConnectedClients implements StateDetail {
    @Override
    public String title() {
        return "Clients";
    }

    @Override
    public String value() {
        int clients = 0;
        for (ClientConnection clientConnection : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            if (clientConnection.isConnected()) clients++;
        }
        return clients + "";
    }
}
