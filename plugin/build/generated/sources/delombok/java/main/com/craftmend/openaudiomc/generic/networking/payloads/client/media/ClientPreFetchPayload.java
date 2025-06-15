package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientPreFetchPayload extends AbstractPacketPayload {
    private String source;
    private String origin = "automatic"; // or command, if invoked manually
    private boolean clear = false;
    private boolean keepCopy = false;

    public String getSource() {
        return this.source;
    }

    public String getOrigin() {
        return this.origin;
    }

    public boolean isClear() {
        return this.clear;
    }

    public boolean isKeepCopy() {
        return this.keepCopy;
    }

    public void setSource(final String source) {
        this.source = source;
    }

    public void setOrigin(final String origin) {
        this.origin = origin;
    }

    public void setClear(final boolean clear) {
        this.clear = clear;
    }

    public void setKeepCopy(final boolean keepCopy) {
        this.keepCopy = keepCopy;
    }

    @Override
    public String toString() {
        return "ClientPreFetchPayload(source=" + this.getSource() + ", origin=" + this.getOrigin() + ", clear=" + this.isClear() + ", keepCopy=" + this.isKeepCopy() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientPreFetchPayload)) return false;
        final ClientPreFetchPayload other = (ClientPreFetchPayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isClear() != other.isClear()) return false;
        if (this.isKeepCopy() != other.isKeepCopy()) return false;
        final Object this$source = this.getSource();
        final Object other$source = other.getSource();
        if (this$source == null ? other$source != null : !this$source.equals(other$source)) return false;
        final Object this$origin = this.getOrigin();
        final Object other$origin = other.getOrigin();
        if (this$origin == null ? other$origin != null : !this$origin.equals(other$origin)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientPreFetchPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isClear() ? 79 : 97);
        result = result * PRIME + (this.isKeepCopy() ? 79 : 97);
        final Object $source = this.getSource();
        result = result * PRIME + ($source == null ? 43 : $source.hashCode());
        final Object $origin = this.getOrigin();
        result = result * PRIME + ($origin == null ? 43 : $origin.hashCode());
        return result;
    }

    public ClientPreFetchPayload() {
    }

    public ClientPreFetchPayload(final String source, final String origin, final boolean clear, final boolean keepCopy) {
        this.source = source;
        this.origin = origin;
        this.clear = clear;
        this.keepCopy = keepCopy;
    }
}
