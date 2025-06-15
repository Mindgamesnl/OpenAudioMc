package com.craftmend.openaudiomc.spigot.modules.rules.rules.biome;

import com.craftmend.openaudiomc.spigot.modules.rules.data.Rule;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.World;
import org.bukkit.block.Biome;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class BiomeRule extends Rule<BiomeRuleTest> {

    @Override
    public String getName() {
        return "Biome Rule";
    }

    @Override
    public String getDescription() {
        return "Requires the player to be in a specific biome";
    }

    @Override
    public Collection<BiomeRuleTest> getTests() {
        List<BiomeRuleTest> testList = new ArrayList<>();
        for (Biome value : Biome.values()) {
            testList.add(new BiomeRuleTest(value.name()));
        }
        return testList;
    }

    @Override
    public String getId() {
        return "biome";
    }

    @Override
    public Material getIcon() {
        return Material.APPLE;
    }
}
