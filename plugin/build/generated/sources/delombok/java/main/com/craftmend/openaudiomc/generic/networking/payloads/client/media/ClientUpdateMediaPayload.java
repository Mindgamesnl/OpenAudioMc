package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.generic.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientUpdateMediaPayload extends AbstractPacketPayload {
    private MediaUpdate mediaOptions;

    public MediaUpdate getMediaOptions() {
        return this.mediaOptions;
    }

    public void setMediaOptions(final MediaUpdate mediaOptions) {
        this.mediaOptions = mediaOptions;
    }

    @Override
    public String toString() {
        return "ClientUpdateMediaPayload(mediaOptions=" + this.getMediaOptions() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientUpdateMediaPayload)) return false;
        final ClientUpdateMediaPayload other = (ClientUpdateMediaPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$mediaOptions = this.getMediaOptions();
        final Object other$mediaOptions = other.getMediaOptions();
        if (this$mediaOptions == null ? other$mediaOptions != null : !this$mediaOptions.equals(other$mediaOptions)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientUpdateMediaPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $mediaOptions = this.getMediaOptions();
        result = result * PRIME + ($mediaOptions == null ? 43 : $mediaOptions.hashCode());
        return result;
    }

    public ClientUpdateMediaPayload() {
    }

    public ClientUpdateMediaPayload(final MediaUpdate mediaOptions) {
        this.mediaOptions = mediaOptions;
    }
}
