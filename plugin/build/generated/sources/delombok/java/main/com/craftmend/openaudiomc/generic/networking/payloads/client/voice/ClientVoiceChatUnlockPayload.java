package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientVoiceChatUnlockPayload extends AbstractPacketPayload {
    private String streamKey;
    private String streamServer;
    private int radius;
    private boolean hasModeration;

    public String getStreamKey() {
        return this.streamKey;
    }

    public String getStreamServer() {
        return this.streamServer;
    }

    public int getRadius() {
        return this.radius;
    }

    public boolean isHasModeration() {
        return this.hasModeration;
    }

    public void setStreamKey(final String streamKey) {
        this.streamKey = streamKey;
    }

    public void setStreamServer(final String streamServer) {
        this.streamServer = streamServer;
    }

    public void setRadius(final int radius) {
        this.radius = radius;
    }

    public void setHasModeration(final boolean hasModeration) {
        this.hasModeration = hasModeration;
    }

    @Override
    public String toString() {
        return "ClientVoiceChatUnlockPayload(streamKey=" + this.getStreamKey() + ", streamServer=" + this.getStreamServer() + ", radius=" + this.getRadius() + ", hasModeration=" + this.isHasModeration() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientVoiceChatUnlockPayload)) return false;
        final ClientVoiceChatUnlockPayload other = (ClientVoiceChatUnlockPayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getRadius() != other.getRadius()) return false;
        if (this.isHasModeration() != other.isHasModeration()) return false;
        final Object this$streamKey = this.getStreamKey();
        final Object other$streamKey = other.getStreamKey();
        if (this$streamKey == null ? other$streamKey != null : !this$streamKey.equals(other$streamKey)) return false;
        final Object this$streamServer = this.getStreamServer();
        final Object other$streamServer = other.getStreamServer();
        if (this$streamServer == null ? other$streamServer != null : !this$streamServer.equals(other$streamServer)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientVoiceChatUnlockPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getRadius();
        result = result * PRIME + (this.isHasModeration() ? 79 : 97);
        final Object $streamKey = this.getStreamKey();
        result = result * PRIME + ($streamKey == null ? 43 : $streamKey.hashCode());
        final Object $streamServer = this.getStreamServer();
        result = result * PRIME + ($streamServer == null ? 43 : $streamServer.hashCode());
        return result;
    }

    public ClientVoiceChatUnlockPayload(final String streamKey, final String streamServer, final int radius, final boolean hasModeration) {
        this.streamKey = streamKey;
        this.streamServer = streamServer;
        this.radius = radius;
        this.hasModeration = hasModeration;
    }
}
