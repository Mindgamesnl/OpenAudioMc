package com.craftmend.openaudiomc.generic.oac.updates;

import com.craftmend.openaudiomc.generic.oac.object.OnlinePlayer;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class PlayerUpdatePayload {
    public PlayerUpdatePayload(String privateKey, String publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    private String publicKey;
    private String privateKey;
    private final List<OnlinePlayer> joinedPlayers = new ArrayList<>();
    private final List<OnlinePlayer> updatedPlayers = new ArrayList<>();
    private final List<UUID> disconnectedPlayers = new ArrayList<>();
    private boolean forceClear = false;

    public String getPublicKey() {
        return this.publicKey;
    }

    public String getPrivateKey() {
        return this.privateKey;
    }

    public List<OnlinePlayer> getJoinedPlayers() {
        return this.joinedPlayers;
    }

    public List<OnlinePlayer> getUpdatedPlayers() {
        return this.updatedPlayers;
    }

    public List<UUID> getDisconnectedPlayers() {
        return this.disconnectedPlayers;
    }

    public boolean isForceClear() {
        return this.forceClear;
    }

    public void setForceClear(final boolean forceClear) {
        this.forceClear = forceClear;
    }
}
