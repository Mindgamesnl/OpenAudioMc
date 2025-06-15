package com.craftmend.openaudiomc.generic.networking.payloads;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class UpdateServerTimePayload extends AbstractPacketPayload {
    private long timestamp;
    private long offset;

    public long getTimestamp() {
        return this.timestamp;
    }

    public long getOffset() {
        return this.offset;
    }

    public void setTimestamp(final long timestamp) {
        this.timestamp = timestamp;
    }

    public void setOffset(final long offset) {
        this.offset = offset;
    }

    @Override
    public String toString() {
        return "UpdateServerTimePayload(timestamp=" + this.getTimestamp() + ", offset=" + this.getOffset() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof UpdateServerTimePayload)) return false;
        final UpdateServerTimePayload other = (UpdateServerTimePayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getTimestamp() != other.getTimestamp()) return false;
        if (this.getOffset() != other.getOffset()) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof UpdateServerTimePayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final long $timestamp = this.getTimestamp();
        result = result * PRIME + (int) ($timestamp >>> 32 ^ $timestamp);
        final long $offset = this.getOffset();
        result = result * PRIME + (int) ($offset >>> 32 ^ $offset);
        return result;
    }

    public UpdateServerTimePayload(final long timestamp, final long offset) {
        this.timestamp = timestamp;
        this.offset = offset;
    }

    public UpdateServerTimePayload() {
    }
}
