package com.craftmend.openaudiomc.generic.client.store;

import com.craftmend.openaudiomc.generic.client.enums.DataStoreVersion;
import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.markers.Column;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

public class ClientDataStore extends DataStore {
    @Column
    private UUID owner;
    @Column(storeAsBlob = true)
    private DataStoreVersion dataStoreVersion = DataStoreVersion.WINTER_UPDATE;
    @Column
    private Instant lastSeen = Instant.MIN;
    @Column
    private Instant lastVoiceConnection = Instant.MIN;
    @Column
    private Boolean isVoiceBlocked = false;
    @Column(storeAsBlob = true)
    private TreeSet<String> recentVoicechatPeers = new TreeSet<>();
    @Column(storeAsBlob = true)
    private Set<UUID> blockedPlayers = new HashSet<>();

    public void pushPeerName(String name) {
        lastVoiceConnection = Instant.now();
        if (recentVoicechatPeers.size() > 15) {
            recentVoicechatPeers.remove(recentVoicechatPeers.last());
        }
        recentVoicechatPeers.add(name);
    }

    public UUID getOwner() {
        return this.owner;
    }

    public DataStoreVersion getDataStoreVersion() {
        return this.dataStoreVersion;
    }

    public Instant getLastSeen() {
        return this.lastSeen;
    }

    public Instant getLastVoiceConnection() {
        return this.lastVoiceConnection;
    }

    public Boolean getIsVoiceBlocked() {
        return this.isVoiceBlocked;
    }

    public TreeSet<String> getRecentVoicechatPeers() {
        return this.recentVoicechatPeers;
    }

    public Set<UUID> getBlockedPlayers() {
        return this.blockedPlayers;
    }

    public void setOwner(final UUID owner) {
        this.owner = owner;
    }

    public void setDataStoreVersion(final DataStoreVersion dataStoreVersion) {
        this.dataStoreVersion = dataStoreVersion;
    }

    public void setLastSeen(final Instant lastSeen) {
        this.lastSeen = lastSeen;
    }

    public void setLastVoiceConnection(final Instant lastVoiceConnection) {
        this.lastVoiceConnection = lastVoiceConnection;
    }

    public void setIsVoiceBlocked(final Boolean isVoiceBlocked) {
        this.isVoiceBlocked = isVoiceBlocked;
    }

    public void setRecentVoicechatPeers(final TreeSet<String> recentVoicechatPeers) {
        this.recentVoicechatPeers = recentVoicechatPeers;
    }

    public void setBlockedPlayers(final Set<UUID> blockedPlayers) {
        this.blockedPlayers = blockedPlayers;
    }

    public ClientDataStore() {
    }
}
