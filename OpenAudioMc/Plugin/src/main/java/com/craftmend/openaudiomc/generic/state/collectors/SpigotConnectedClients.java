package com.craftmend.openaudiomc.generic.state.collectors;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;

public class SpigotConnectedClients implements StateDetail {

    @Override
    public String title() {
        return "Connected Clients";
    }

    @Override
    public String value() {
        int clients = 0;
        for (SpigotConnection spigotConnection : OpenAudioMc.getService(SpigotPlayerService.class).getClients()) {
            if (spigotConnection.getClientConnection().isConnected()) clients++;
        }
        return clients + "";
    }

}
