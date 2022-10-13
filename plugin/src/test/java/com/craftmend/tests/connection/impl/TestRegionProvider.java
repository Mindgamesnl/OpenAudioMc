package com.craftmend.tests.connection.impl;

import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.ApiRegion;
import org.bukkit.Location;

import java.util.*;

public class TestRegionProvider extends AbstractRegionAdapter {

    private List<String> regionNames = new ArrayList<>();

    public TestRegionProvider(String... names) {
        regionNames.addAll(Arrays.asList(names));
    }


    @Override
    public Set<ApiRegion> getRegionsAtLocation(Location location) {
        return new HashSet<>();
    }

    @Override
    public boolean doesRegionExist(String name) {
        return regionNames.contains(name);
    }

    @Override
    public void postLoad() {

    }
}
