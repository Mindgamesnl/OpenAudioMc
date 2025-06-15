package com.craftmend.openaudiomc.integrations.wglegacy;

import com.craftmend.openaudiomc.integrations.regionprovider.RegisteredRegion;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;

public class LegacyWrappedRegion implements RegisteredRegion {

    private final ProtectedRegion region;

    public LegacyWrappedRegion(ProtectedRegion region) {
        this.region = region;
    }

    @Override
    public String getName() {
        return region.getId();
    }

    @Override
    public int getPriority() {
        return region.getPriority();
    }
}
