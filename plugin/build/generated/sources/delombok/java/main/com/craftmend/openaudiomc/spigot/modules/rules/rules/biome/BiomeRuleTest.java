package com.craftmend.openaudiomc.spigot.modules.rules.rules.biome;

import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.rules.data.Rule;
import com.craftmend.openaudiomc.spigot.modules.rules.data.RuleTest;

public class BiomeRuleTest extends RuleTest {
    private String biomeName;

    @Override
    public String getName() {
        return biomeName;
    }

    @Override
    public String getDescription() {
        return "requires the player to be in biome: " + biomeName;
    }

    @Override
    public boolean testPlayer(SpigotConnection player) {
        return player.getBukkitPlayer().getLocation().getBlock().getBiome().name().equalsIgnoreCase(biomeName);
    }

    @Override
    public String getId() {
        return "biome-" + biomeName;
    }

    @Override
    public String getParentRuleId() {
        return "biome";
    }

    public BiomeRuleTest(final String biomeName) {
        this.biomeName = biomeName;
    }
}
