package com.craftmend.openaudiomc.spigot.modules.rules.rules.time;

import com.craftmend.openaudiomc.spigot.modules.rules.data.Rule;
import com.craftmend.openaudiomc.spigot.modules.rules.rules.world.WorldRuleTest;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.World;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class WorldTimeRule extends Rule<WorldTimeRuleTest> {


    @Override
    public String getName() {
        return "Time Rule";
    }

    @Override
    public String getDescription() {
        return "Requires the world time to be something specific";
    }

    @Override
    public Collection<WorldTimeRuleTest> getTests() {
        List<WorldTimeRuleTest> testList = new ArrayList<>();

        testList.add(new WorldTimeRuleTest("Night", 11, 24));
        testList.add(new WorldTimeRuleTest("Night", 0, 6));
        testList.add(new WorldTimeRuleTest("Day", 6, 11));
        testList.add(new WorldTimeRuleTest("Middle of the night", 1, 3));

        return testList;
    }

    @Override
    public String getId() {
        return "world-time";
    }

    @Override
    public Material getIcon() {
        return Material.CLOCK;
    }
}
