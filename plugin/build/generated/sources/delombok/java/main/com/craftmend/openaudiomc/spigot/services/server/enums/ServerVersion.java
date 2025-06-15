package com.craftmend.openaudiomc.spigot.services.server.enums;

public enum ServerVersion {
    LEGACY(1), MODERN(2);
    private final int revision;

    ServerVersion(int majorRevision) {
        revision = majorRevision;
    }

    public int getRevision() {
        return this.revision;
    }
}
