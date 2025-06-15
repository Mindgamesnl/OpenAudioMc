package com.craftmend.openaudiomc.generic.networking.payloads.in;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.api.media.MediaError;
import java.util.UUID;

public class ClientFailedMediaPayload extends AbstractPacketPayload {
    private UUID client;
    private MediaError mediaError;
    private String source;

    public UUID getClient() {
        return this.client;
    }

    public MediaError getMediaError() {
        return this.mediaError;
    }

    public String getSource() {
        return this.source;
    }

    public void setClient(final UUID client) {
        this.client = client;
    }

    public void setMediaError(final MediaError mediaError) {
        this.mediaError = mediaError;
    }

    public void setSource(final String source) {
        this.source = source;
    }

    @Override
    public String toString() {
        return "ClientFailedMediaPayload(client=" + this.getClient() + ", mediaError=" + this.getMediaError() + ", source=" + this.getSource() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientFailedMediaPayload)) return false;
        final ClientFailedMediaPayload other = (ClientFailedMediaPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$client = this.getClient();
        final Object other$client = other.getClient();
        if (this$client == null ? other$client != null : !this$client.equals(other$client)) return false;
        final Object this$mediaError = this.getMediaError();
        final Object other$mediaError = other.getMediaError();
        if (this$mediaError == null ? other$mediaError != null : !this$mediaError.equals(other$mediaError)) return false;
        final Object this$source = this.getSource();
        final Object other$source = other.getSource();
        if (this$source == null ? other$source != null : !this$source.equals(other$source)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientFailedMediaPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $client = this.getClient();
        result = result * PRIME + ($client == null ? 43 : $client.hashCode());
        final Object $mediaError = this.getMediaError();
        result = result * PRIME + ($mediaError == null ? 43 : $mediaError.hashCode());
        final Object $source = this.getSource();
        result = result * PRIME + ($source == null ? 43 : $source.hashCode());
        return result;
    }

    public ClientFailedMediaPayload(final UUID client, final MediaError mediaError, final String source) {
        this.client = client;
        this.mediaError = mediaError;
        this.source = source;
    }

    public ClientFailedMediaPayload() {
    }
}
