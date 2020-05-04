package com.craftmend.openaudiomc.generic.plus.socket;

import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.plus.PlusSocketSession;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class PlusConnectionManager {

    private Map<UUID, PlusSocketSession> sessionMap = new HashMap<>();

    public void removeSessionIfPresent(ClientConnection owner) {
        PlusSocketSession foundSession = getByOwner(owner);
        if (foundSession != null) sessionMap.remove(foundSession.getSessionUuid());
    }

    public PlusSocketSession getBySessionId(UUID uuid) {
        return sessionMap.get(uuid);
    }

    public PlusSocketSession getByOwner(ClientConnection clientConnection) {
        return sessionMap.values().stream()
                .filter(session ->
                        session.getOwner().getPlayer().getUniqueId().equals(clientConnection.getPlayer().getUniqueId()))
                .findFirst()
                .orElse(null);
    }

}
