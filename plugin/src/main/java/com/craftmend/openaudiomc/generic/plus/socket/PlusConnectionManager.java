package com.craftmend.openaudiomc.generic.plus.socket;

import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.plus.PlusSocketSession;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class PlusConnectionManager {

    private Map<UUID, PlusSocketSession> sessionMap = new HashMap<>();

    public void removeSessionIfPresent(ClientConnection owner) {
        sessionMap.remove(owner.getPlayer().getUniqueId());
    }

}
