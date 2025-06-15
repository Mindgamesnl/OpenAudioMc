package com.craftmend.openaudiomc.generic.mojang.store;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.markers.Column;
import java.time.Instant;
import java.util.UUID;

public class MojangProfile extends DataStore {
    @Column
    private String name;
    @Column
    private UUID uuid;
    @Column
    private Instant lastSeen = null;

    public String getName() {
        return this.name;
    }

    public UUID getUuid() {
        return this.uuid;
    }

    public Instant getLastSeen() {
        return this.lastSeen;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void setUuid(final UUID uuid) {
        this.uuid = uuid;
    }

    public void setLastSeen(final Instant lastSeen) {
        this.lastSeen = lastSeen;
    }

    @Override
    public String toString() {
        return "MojangProfile(name=" + this.getName() + ", uuid=" + this.getUuid() + ", lastSeen=" + this.getLastSeen() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof MojangProfile)) return false;
        final MojangProfile other = (MojangProfile) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$name = this.getName();
        final Object other$name = other.getName();
        if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
        final Object this$uuid = this.getUuid();
        final Object other$uuid = other.getUuid();
        if (this$uuid == null ? other$uuid != null : !this$uuid.equals(other$uuid)) return false;
        final Object this$lastSeen = this.getLastSeen();
        final Object other$lastSeen = other.getLastSeen();
        if (this$lastSeen == null ? other$lastSeen != null : !this$lastSeen.equals(other$lastSeen)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof MojangProfile;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $name = this.getName();
        result = result * PRIME + ($name == null ? 43 : $name.hashCode());
        final Object $uuid = this.getUuid();
        result = result * PRIME + ($uuid == null ? 43 : $uuid.hashCode());
        final Object $lastSeen = this.getLastSeen();
        result = result * PRIME + ($lastSeen == null ? 43 : $lastSeen.hashCode());
        return result;
    }

    public MojangProfile() {
    }

    public MojangProfile(final String name, final UUID uuid, final Instant lastSeen) {
        this.name = name;
        this.uuid = uuid;
        this.lastSeen = lastSeen;
    }
}
