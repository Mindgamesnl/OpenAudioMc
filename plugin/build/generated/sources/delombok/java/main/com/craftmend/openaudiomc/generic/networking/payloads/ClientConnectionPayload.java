package com.craftmend.openaudiomc.generic.networking.payloads;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import java.util.UUID;

public class ClientConnectionPayload extends AbstractPacketPayload {
    private UUID uuid;
    private String token;

    public UUID getUuid() {
        return this.uuid;
    }

    public String getToken() {
        return this.token;
    }

    public void setUuid(final UUID uuid) {
        this.uuid = uuid;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "ClientConnectionPayload(uuid=" + this.getUuid() + ", token=" + this.getToken() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientConnectionPayload)) return false;
        final ClientConnectionPayload other = (ClientConnectionPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$uuid = this.getUuid();
        final Object other$uuid = other.getUuid();
        if (this$uuid == null ? other$uuid != null : !this$uuid.equals(other$uuid)) return false;
        final Object this$token = this.getToken();
        final Object other$token = other.getToken();
        if (this$token == null ? other$token != null : !this$token.equals(other$token)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientConnectionPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $uuid = this.getUuid();
        result = result * PRIME + ($uuid == null ? 43 : $uuid.hashCode());
        final Object $token = this.getToken();
        result = result * PRIME + ($token == null ? 43 : $token.hashCode());
        return result;
    }

    public ClientConnectionPayload(final UUID uuid, final String token) {
        this.uuid = uuid;
        this.token = token;
    }

    public ClientConnectionPayload() {
    }
}
