package com.craftmend.openaudiomc.generic.craftmend.updates;

import com.craftmend.openaudiomc.generic.craftmend.object.OnlinePlayer;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
public class PlayerUpdatePayload {

    public PlayerUpdatePayload(String privateKey, String publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    private final String publicKey;
    private final String privateKey;
    private final List<OnlinePlayer> joinedPlayers = new ArrayList<>();
    private final List<OnlinePlayer> updatedPlayers = new ArrayList<>();
    private final List<UUID> disconnectedPlayers = new ArrayList<>();
    @Setter private boolean forceClear = false;

}
