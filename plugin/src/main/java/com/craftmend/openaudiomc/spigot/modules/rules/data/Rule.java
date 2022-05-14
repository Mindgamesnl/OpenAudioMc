package com.craftmend.openaudiomc.spigot.modules.rules.data;

import org.bukkit.Material;

import java.util.Collection;

public abstract class Rule<T extends RuleTest> {

    public abstract String getName();
    public abstract String getDescription();
    public abstract Collection<T> getTests();
    public abstract String getId();
    public abstract Material getIcon();

}
