package com.craftmend.openaudiomc.generic.client.store;

import com.craftmend.openaudiomc.generic.client.enums.DataStoreVersion;
import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.markers.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ClientDataStore extends DataStore {

    @Column
    private UUID owner;
    @Column(
            storeAsBlob = true
    )
    private DataStoreVersion dataStoreVersion = DataStoreVersion.WINTER_UPDATE;
    @Column private Instant lastSeen = Instant.MIN;;
    @Column private Instant lastVoiceConnection = Instant.MIN;
    @Column private Boolean isVoiceBlocked = false;

    @Column(
            storeAsBlob = true
    )
    private TreeSet<String> recentVoicechatPeers = new TreeSet<>();

    @Column(
            storeAsBlob = true
    )
    private Set<UUID> blockedPlayers = new HashSet<>();

    public void pushPeerName(String name) {
        lastVoiceConnection = Instant.now();
        if (recentVoicechatPeers.size() > 15) {
            recentVoicechatPeers.remove(recentVoicechatPeers.last());
        }
        recentVoicechatPeers.add(name);
    }

}
