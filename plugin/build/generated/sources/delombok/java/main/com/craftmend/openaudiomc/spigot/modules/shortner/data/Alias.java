package com.craftmend.openaudiomc.spigot.modules.shortner.data;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.markers.Column;

public class Alias extends DataStore {
    @Column
    private String name;
    @Column
    private String target;

    public String getName() {
        return this.name;
    }

    public String getTarget() {
        return this.target;
    }

    public Alias() {
    }

    public Alias(final String name, final String target) {
        this.name = name;
        this.target = target;
    }
}
