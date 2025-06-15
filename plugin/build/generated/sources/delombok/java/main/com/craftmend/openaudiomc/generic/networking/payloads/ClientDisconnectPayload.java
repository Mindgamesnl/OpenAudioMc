package com.craftmend.openaudiomc.generic.networking.payloads;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import java.util.UUID;

public class ClientDisconnectPayload extends AbstractPacketPayload {
    private UUID client;

    public UUID getClient() {
        return this.client;
    }

    public void setClient(final UUID client) {
        this.client = client;
    }

    @Override
    public String toString() {
        return "ClientDisconnectPayload(client=" + this.getClient() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientDisconnectPayload)) return false;
        final ClientDisconnectPayload other = (ClientDisconnectPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$client = this.getClient();
        final Object other$client = other.getClient();
        if (this$client == null ? other$client != null : !this$client.equals(other$client)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientDisconnectPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $client = this.getClient();
        result = result * PRIME + ($client == null ? 43 : $client.hashCode());
        return result;
    }

    public ClientDisconnectPayload() {
    }

    public ClientDisconnectPayload(final UUID client) {
        this.client = client;
    }
}
