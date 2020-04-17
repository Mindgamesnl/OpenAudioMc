package com.craftmend.openaudiomc.generic.plus.updates;

import com.craftmend.openaudiomc.generic.plus.object.PlusPlayer;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
public class PlayerUpdatePayload {

    public PlayerUpdatePayload(String privateKey) {
        this.privateKey = privateKey;
    }

    private String privateKey;
    private List<PlusPlayer> plusPlayers = new ArrayList<>();
    private List<PlusPlayer> stateUpdated = new ArrayList<>();
    private List<UUID> offlinePlayers = new ArrayList<>();
    @Setter private boolean forceClear = false;

}
