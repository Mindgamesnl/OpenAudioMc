package com.craftmend.openaudiomc.generic.client.store;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import lombok.Data;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
public class ClientDataStore extends DataStore {

    private Instant lastSeen = null;
    private boolean isVoiceBlocked = false;
    private Set<String> recentVoicechatPeers = new HashSet<>();
    private Set<UUID> blockedPlayers = new HashSet<>();

}
