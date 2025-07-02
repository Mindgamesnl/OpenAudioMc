package com.craftmend.openaudiomc.integrations.regionprovider;

public interface RegisteredRegion {

    /**
     * Returns the name of the region.
     *
     * @return the name of the region
     */
    String getName();

    /**
     * Returns the priority of the region.
     *
     * @return the priority of the region
     */
    int getPriority();


}
