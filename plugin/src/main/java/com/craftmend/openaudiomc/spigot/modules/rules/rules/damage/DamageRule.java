package com.craftmend.openaudiomc.spigot.modules.rules.rules.damage;

import com.craftmend.openaudiomc.spigot.modules.rules.data.Rule;
import lombok.AllArgsConstructor;
import org.bukkit.Material;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
public class DamageRule extends Rule<DamageRuleTest> {

    private DamageListener damageListener;

    @Override
    public String getName() {
        return "Damage Rule";
    }

    @Override
    public String getDescription() {
        return "Requires the player to be attacked by another entity";
    }

    @Override
    public Collection<DamageRuleTest> getTests() {
        List<DamageRuleTest> testList = new ArrayList<>();

        testList.add(new DamageRuleTest(damageListener, 10));
        testList.add(new DamageRuleTest(damageListener, 15));
        testList.add(new DamageRuleTest(damageListener, 20));
        testList.add(new DamageRuleTest(damageListener, 30));
        testList.add(new DamageRuleTest(damageListener, 60));

        return testList;
    }

    @Override
    public String getId() {
        return "damagereceived";
    }

    @Override
    public Material getIcon() {
        return Material.DIAMOND_SWORD;
    }
}
