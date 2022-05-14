package com.craftmend.openaudiomc.spigot.modules.rules.data;

import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;

public abstract class RuleTest {

    public abstract String getName();
    public abstract String getDescription();
    public abstract boolean testPlayer(SpigotConnection player);
    public abstract String getId();

}
