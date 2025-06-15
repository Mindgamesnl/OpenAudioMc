package com.craftmend.openaudiomc.generic.networking.payloads.in;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.in.objects.MixerTrack;
import java.util.List;
import java.util.UUID;

public class ClientUpdateChannelListPayload extends AbstractPacketPayload {
    private UUID client;
    private List<MixerTrack> tracks;

    public UUID getClient() {
        return this.client;
    }

    public List<MixerTrack> getTracks() {
        return this.tracks;
    }

    public void setClient(final UUID client) {
        this.client = client;
    }

    public void setTracks(final List<MixerTrack> tracks) {
        this.tracks = tracks;
    }

    @Override
    public String toString() {
        return "ClientUpdateChannelListPayload(client=" + this.getClient() + ", tracks=" + this.getTracks() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientUpdateChannelListPayload)) return false;
        final ClientUpdateChannelListPayload other = (ClientUpdateChannelListPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$client = this.getClient();
        final Object other$client = other.getClient();
        if (this$client == null ? other$client != null : !this$client.equals(other$client)) return false;
        final Object this$tracks = this.getTracks();
        final Object other$tracks = other.getTracks();
        if (this$tracks == null ? other$tracks != null : !this$tracks.equals(other$tracks)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientUpdateChannelListPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $client = this.getClient();
        result = result * PRIME + ($client == null ? 43 : $client.hashCode());
        final Object $tracks = this.getTracks();
        result = result * PRIME + ($tracks == null ? 43 : $tracks.hashCode());
        return result;
    }

    public ClientUpdateChannelListPayload(final UUID client, final List<MixerTrack> tracks) {
        this.client = client;
        this.tracks = tracks;
    }

    public ClientUpdateChannelListPayload() {
    }
}
