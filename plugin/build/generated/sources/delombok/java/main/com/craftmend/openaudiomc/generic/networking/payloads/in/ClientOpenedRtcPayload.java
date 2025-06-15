package com.craftmend.openaudiomc.generic.networking.payloads.in;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.voicechat.events.VoiceStateChangeEvent;
import java.util.UUID;

public class ClientOpenedRtcPayload extends AbstractPacketPayload {
    private UUID client;
    private boolean enabled;
    private VoiceStateChangeEvent event;

    public UUID getClient() {
        return this.client;
    }

    public boolean isEnabled() {
        return this.enabled;
    }

    public VoiceStateChangeEvent getEvent() {
        return this.event;
    }

    public void setClient(final UUID client) {
        this.client = client;
    }

    public void setEnabled(final boolean enabled) {
        this.enabled = enabled;
    }

    public void setEvent(final VoiceStateChangeEvent event) {
        this.event = event;
    }

    @Override
    public String toString() {
        return "ClientOpenedRtcPayload(client=" + this.getClient() + ", enabled=" + this.isEnabled() + ", event=" + this.getEvent() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientOpenedRtcPayload)) return false;
        final ClientOpenedRtcPayload other = (ClientOpenedRtcPayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isEnabled() != other.isEnabled()) return false;
        final Object this$client = this.getClient();
        final Object other$client = other.getClient();
        if (this$client == null ? other$client != null : !this$client.equals(other$client)) return false;
        final Object this$event = this.getEvent();
        final Object other$event = other.getEvent();
        if (this$event == null ? other$event != null : !this$event.equals(other$event)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientOpenedRtcPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isEnabled() ? 79 : 97);
        final Object $client = this.getClient();
        result = result * PRIME + ($client == null ? 43 : $client.hashCode());
        final Object $event = this.getEvent();
        result = result * PRIME + ($event == null ? 43 : $event.hashCode());
        return result;
    }

    public ClientOpenedRtcPayload(final UUID client, final boolean enabled, final VoiceStateChangeEvent event) {
        this.client = client;
        this.enabled = enabled;
        this.event = event;
    }

    public ClientOpenedRtcPayload() {
    }
}
