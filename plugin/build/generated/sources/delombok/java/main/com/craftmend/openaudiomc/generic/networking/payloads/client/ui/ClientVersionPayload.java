package com.craftmend.openaudiomc.generic.networking.payloads.client.ui;

import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientVersionPayload extends AbstractPacketPayload {
    // 2 = enable general callbacks
    // 3 = enable youtube callbacks
    // 4 = enable client volume updates
    // 5 = enable voice loudness
    // 6 = enable magic value sharing
    private int protocolRevision = 6;
    private int locationUpdateTicks = MagicValue.LOCATION_TRACK_INTERVAL.get(Integer.class);

    public int getProtocolRevision() {
        return this.protocolRevision;
    }

    public int getLocationUpdateTicks() {
        return this.locationUpdateTicks;
    }

    public void setProtocolRevision(final int protocolRevision) {
        this.protocolRevision = protocolRevision;
    }

    public void setLocationUpdateTicks(final int locationUpdateTicks) {
        this.locationUpdateTicks = locationUpdateTicks;
    }

    @Override
    public String toString() {
        return "ClientVersionPayload(protocolRevision=" + this.getProtocolRevision() + ", locationUpdateTicks=" + this.getLocationUpdateTicks() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientVersionPayload)) return false;
        final ClientVersionPayload other = (ClientVersionPayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getProtocolRevision() != other.getProtocolRevision()) return false;
        if (this.getLocationUpdateTicks() != other.getLocationUpdateTicks()) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientVersionPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getProtocolRevision();
        result = result * PRIME + this.getLocationUpdateTicks();
        return result;
    }

    public ClientVersionPayload() {
    }

    public ClientVersionPayload(final int protocolRevision, final int locationUpdateTicks) {
        this.protocolRevision = protocolRevision;
        this.locationUpdateTicks = locationUpdateTicks;
    }
}
