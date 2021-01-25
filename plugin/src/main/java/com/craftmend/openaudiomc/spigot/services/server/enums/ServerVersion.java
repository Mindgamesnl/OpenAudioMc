package com.craftmend.openaudiomc.spigot.services.server.enums;

import lombok.Getter;

public enum ServerVersion {

    LEGACY(1),
    MODERN(2);

    @Getter private int revision;
    ServerVersion(int majorRevision) {
        revision = majorRevision;
    }
}
