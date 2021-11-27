package com.craftmend.openaudiomc.generic.player;

import com.craftmend.openaudiomc.generic.service.Servicable;

import java.util.Collection;
import java.util.UUID;

public interface PlayerService extends Servicable {

    User getPlayerByUUID(UUID uuid);
    User getPlayerByName(String name);
    Collection<User> getPlayers();

}
