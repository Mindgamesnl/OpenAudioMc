package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.interfaces.SourceHolder;

public class ClientCreateMediaPayload extends AbstractPacketPayload implements SourceHolder {
    public ClientCreateMediaPayload(Media media) {
        this.media = media;
    }

    private Media media;
    private int distance;
    private int maxDistance;

    @Override
    public String getSource() {
        return media.getSource();
    }

    @Override
    public void setSource(String source) {
        media.setSource(source);
    }

    public Media getMedia() {
        return this.media;
    }

    public int getDistance() {
        return this.distance;
    }

    public int getMaxDistance() {
        return this.maxDistance;
    }

    public void setMedia(final Media media) {
        this.media = media;
    }

    public void setDistance(final int distance) {
        this.distance = distance;
    }

    public void setMaxDistance(final int maxDistance) {
        this.maxDistance = maxDistance;
    }

    @Override
    public String toString() {
        return "ClientCreateMediaPayload(media=" + this.getMedia() + ", distance=" + this.getDistance() + ", maxDistance=" + this.getMaxDistance() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientCreateMediaPayload)) return false;
        final ClientCreateMediaPayload other = (ClientCreateMediaPayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getDistance() != other.getDistance()) return false;
        if (this.getMaxDistance() != other.getMaxDistance()) return false;
        final Object this$media = this.getMedia();
        final Object other$media = other.getMedia();
        if (this$media == null ? other$media != null : !this$media.equals(other$media)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientCreateMediaPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getDistance();
        result = result * PRIME + this.getMaxDistance();
        final Object $media = this.getMedia();
        result = result * PRIME + ($media == null ? 43 : $media.hashCode());
        return result;
    }

    public ClientCreateMediaPayload() {
    }

    public ClientCreateMediaPayload(final Media media, final int distance, final int maxDistance) {
        this.media = media;
        this.distance = distance;
        this.maxDistance = maxDistance;
    }
}
