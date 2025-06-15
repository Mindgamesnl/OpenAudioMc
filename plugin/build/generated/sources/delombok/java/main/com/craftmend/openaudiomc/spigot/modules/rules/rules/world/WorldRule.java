package com.craftmend.openaudiomc.spigot.modules.rules.rules.world;

import com.craftmend.openaudiomc.spigot.modules.rules.data.Rule;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.World;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class WorldRule extends Rule<WorldRuleTest> {

    @Override
    public String getName() {
        return "World Rule";
    }

    @Override
    public String getDescription() {
        return "Requires the player to be in a specific world";
    }

    @Override
    public Collection<WorldRuleTest> getTests() {
        List<WorldRuleTest> testList = new ArrayList<>();
        for (World world : Bukkit.getWorlds()) {
            testList.add(new WorldRuleTest(world.getName()));
        }
        return testList;
    }

    @Override
    public String getId() {
        return "world";
    }

    @Override
    public Material getIcon() {
        return Material.GRASS_BLOCK;
    }
}
