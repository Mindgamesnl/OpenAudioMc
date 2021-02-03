package com.craftmend.openaudiomc.generic.craftmend.object;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
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
}
