package com.craftmend.openaudiomc.generic.plus.object;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class PlusPlayer {

    private String name;
    private UUID uuid;
    private String key;
    private boolean isConnected;

    // secondary state update for packet
    public PlusPlayer(UUID uniqueId, boolean isConnected) {
        this.uuid = uniqueId;
        this.isConnected = isConnected;
    }
}
