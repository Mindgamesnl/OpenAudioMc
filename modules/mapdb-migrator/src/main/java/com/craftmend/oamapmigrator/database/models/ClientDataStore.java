package com.craftmend.oamapmigrator.database.models;

import com.craftmend.oamapmigrator.database.internal.LegacyStore;
import com.craftmend.openaudiomc.generic.client.enums.DataStoreVersion;
import lombok.Data;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

@Data
public class ClientDataStore extends LegacyStore {

    private DataStoreVersion dataStoreVersion = DataStoreVersion.WINTER_UPDATE;
    private Instant lastSeen = Instant.MIN;;
    private Instant lastVoiceConnection = Instant.MIN;
    private boolean isVoiceBlocked = false;
    private TreeSet<String> recentVoicechatPeers = new TreeSet<>();
    private Set<UUID> blockedPlayers = new HashSet<>();

}
