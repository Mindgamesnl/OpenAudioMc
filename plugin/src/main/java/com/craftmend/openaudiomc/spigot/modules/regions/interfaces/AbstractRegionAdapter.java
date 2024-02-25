package com.craftmend.openaudiomc.spigot.modules.regions.interfaces;

import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import org.bukkit.Location;

import java.util.*;

public abstract class AbstractRegionAdapter extends RegionAdapterBase {

    /**
     * Expose the RegionModule instance to the implementing class
     */
    protected RegionModule regionModule;

    /**
     * Simple API constructor that allows you to register your own implementation like so
     * AudioApi.getInstance().getWorldApi().setRegionHandler(new MyRegionImplementation());
     */
    public AbstractRegionAdapter() {
        super(null);
    }

    /**
     * A default constructor for internal usage
     * @param regionModule Default implementation
     */
    public AbstractRegionAdapter(RegionModule regionModule) {
        super(regionModule);
        this.regionModule = regionModule;
        this.injectSelf(this);
    }


    /**
     * This method requires you to return a collection of regions that you wrap in the ApiRegion object
     * You need to handle sorting yourself, but this class contains a protected method that can do that for you
     * you just need to call it when OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_USE_WG_PRIORITY)
     * is true
     *
     * @param location Target location
     * @return a list of api regions
     */
    public abstract Set<ApiRegion> getRegionsAtLocation(Location location);

    /**
     * A simple method that should indicate whether a region is valid or not
     * this is used to ignore broken regions in the data.yml and to detect invalid commands
     *
     * @param name A region name (lowercase)
     * @return if it exists or not
     */
    public abstract boolean doesRegionExist(String name);

    /**
     * @param regionModule Injected dependency
     */
    public void boot(RegionModule regionModule) {
        this.regionModule = regionModule;
    }

    public abstract void postLoad();
}
