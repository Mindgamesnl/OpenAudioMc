package com.craftmend.openaudiomc.generic.client.store;

import com.craftmend.openaudiomc.generic.client.enums.DataStoreVersion;
import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import lombok.Data;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

@Data
public class ClientDataStore extends DataStore {

    private DataStoreVersion dataStoreVersion = DataStoreVersion.WINTER_UPDATE;
    private Instant lastSeen = Instant.MIN;;
    private Instant lastVoiceConnection = Instant.MIN;
    private boolean isVoiceBlocked = false;
    private TreeSet<String> recentVoicechatPeers = new TreeSet<>();
    private Set<UUID> blockedPlayers = new HashSet<>();

    public void pushPeerName(String name) {
        lastVoiceConnection = Instant.now();
        if (recentVoicechatPeers.size() > 15) {
            recentVoicechatPeers.remove(recentVoicechatPeers.last());
        }
        recentVoicechatPeers.add(name);
    }

}
