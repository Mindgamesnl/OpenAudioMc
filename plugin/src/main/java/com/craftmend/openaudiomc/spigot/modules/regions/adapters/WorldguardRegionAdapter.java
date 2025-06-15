package com.craftmend.openaudiomc.spigot.modules.regions.adapters;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.integrations.regionprovider.RegionRegistry;
import com.craftmend.openaudiomc.integrations.regionprovider.RegisteredRegion;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import org.bukkit.Location;

import java.util.Set;

public class WorldguardRegionAdapter extends AbstractRegionAdapter {

    private boolean booted = false;
    private final boolean usePriority = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_USE_WG_PRIORITY);
    private final RegionRegistry worldGuardRegionRegistry;

    public WorldguardRegionAdapter(RegionModule regionModule, RegionRegistry regionRegistry) {
        super(regionModule);
        this.worldGuardRegionRegistry = regionRegistry;
    }

    @Override
    public Set<RegisteredRegion> getRegionsAtLocation(Location location) {
        return this.worldGuardRegionRegistry.getRegionsAtLocation(location, usePriority);
    }

    @Override
    public boolean doesRegionExist(String name) {
        return this.worldGuardRegionRegistry.doesRegionExist(name);
    }

    @Override
    public void postLoad() {
        booted = true;
    }
}
