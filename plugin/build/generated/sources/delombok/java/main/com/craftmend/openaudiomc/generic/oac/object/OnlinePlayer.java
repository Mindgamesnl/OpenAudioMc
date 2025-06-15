package com.craftmend.openaudiomc.generic.oac.object;

import java.util.UUID;

public class OnlinePlayer {
    private String name;
    private UUID uuid;
    private String key;
    private boolean isConnected;

    // secondary state update for packet
    public OnlinePlayer(UUID uniqueId, boolean isConnected) {
        this.uuid = uniqueId;
        this.isConnected = isConnected;
    }

    public String getName() {
        return this.name;
    }

    public UUID getUuid() {
        return this.uuid;
    }

    public String getKey() {
        return this.key;
    }

    public boolean isConnected() {
        return this.isConnected;
    }

    public OnlinePlayer(final String name, final UUID uuid, final String key, final boolean isConnected) {
        this.name = name;
        this.uuid = uuid;
        this.key = key;
        this.isConnected = isConnected;
    }
}
