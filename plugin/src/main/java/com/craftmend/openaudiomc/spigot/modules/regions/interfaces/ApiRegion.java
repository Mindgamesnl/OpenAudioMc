package com.craftmend.openaudiomc.spigot.modules.regions.interfaces;

import com.sk89q.worldguard.protection.regions.ProtectedRegion;

public interface ApiRegion {

    int getPriority();
    String getName();

    public static ApiRegion wrapWorldGuard(ProtectedRegion protectedRegion) {
        return new ApiRegion() {
            @Override
            public int getPriority() {
                return protectedRegion.getPriority();
            }

            @Override
            public String getName() {
                return protectedRegion.getId();
            }
        };
    }

}
