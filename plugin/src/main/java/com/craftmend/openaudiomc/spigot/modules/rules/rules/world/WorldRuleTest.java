package com.craftmend.openaudiomc.spigot.modules.rules.rules.world;

import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.rules.data.RuleTest;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class WorldRuleTest extends RuleTest {

    private String worldName;

    @Override
    public String getName() {
        return worldName;
    }

    @Override
    public String getDescription() {
        return "requires the player to be in the world: " + worldName;
    }

    @Override
    public boolean testPlayer(SpigotConnection player) {
        return player.getBukkitPlayer().getLocation().getWorld().getName().equalsIgnoreCase(worldName);
    }

    @Override
    public String getId() {
        return "world-" + worldName;
    }

    @Override
    public String getParentRuleId() {
        return "world";
    }
}
