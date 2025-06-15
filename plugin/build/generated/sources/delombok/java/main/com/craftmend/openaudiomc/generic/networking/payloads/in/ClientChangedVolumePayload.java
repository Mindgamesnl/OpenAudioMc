package com.craftmend.openaudiomc.generic.networking.payloads.in;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import java.util.UUID;

public class ClientChangedVolumePayload extends AbstractPacketPayload {
    private int volume;
    private UUID client;

    public int getVolume() {
        return this.volume;
    }

    public UUID getClient() {
        return this.client;
    }

    public void setVolume(final int volume) {
        this.volume = volume;
    }

    public void setClient(final UUID client) {
        this.client = client;
    }

    @Override
    public String toString() {
        return "ClientChangedVolumePayload(volume=" + this.getVolume() + ", client=" + this.getClient() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientChangedVolumePayload)) return false;
        final ClientChangedVolumePayload other = (ClientChangedVolumePayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getVolume() != other.getVolume()) return false;
        final Object this$client = this.getClient();
        final Object other$client = other.getClient();
        if (this$client == null ? other$client != null : !this$client.equals(other$client)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientChangedVolumePayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getVolume();
        final Object $client = this.getClient();
        result = result * PRIME + ($client == null ? 43 : $client.hashCode());
        return result;
    }

    public ClientChangedVolumePayload(final int volume, final UUID client) {
        this.volume = volume;
        this.client = client;
    }

    public ClientChangedVolumePayload() {
    }
}
