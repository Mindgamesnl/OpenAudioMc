package com.craftmend.openaudiomc.spigot.modules.rules.storage;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.spigot.modules.rules.data.RuleTest;
import com.craftmend.storm.api.markers.Column;
import java.util.*;

public class MediaRule extends DataStore {
    @Column(storeAsBlob = true)
    private Map<UUID, RuleTest> tests = new HashMap<>();
    @Column
    private String name;

    public MediaRule(String name) {
        this.name = name;
    }

    public void addTest(UUID testid, RuleTest requiement) {
        tests.put(testid, requiement);
    }

    public Map<UUID, RuleTest> getTests() {
        return this.tests;
    }

    public String getName() {
        return this.name;
    }

    public MediaRule() {
    }
}
