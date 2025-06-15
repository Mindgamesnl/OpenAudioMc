package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientVoiceOptionsPayload extends AbstractPacketPayload {
    private String targetPeerKey;
    private VoicePeerOptions options;

    public String getTargetPeerKey() {
        return this.targetPeerKey;
    }

    public VoicePeerOptions getOptions() {
        return this.options;
    }

    public void setTargetPeerKey(final String targetPeerKey) {
        this.targetPeerKey = targetPeerKey;
    }

    public void setOptions(final VoicePeerOptions options) {
        this.options = options;
    }

    @Override
    public String toString() {
        return "ClientVoiceOptionsPayload(targetPeerKey=" + this.getTargetPeerKey() + ", options=" + this.getOptions() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientVoiceOptionsPayload)) return false;
        final ClientVoiceOptionsPayload other = (ClientVoiceOptionsPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$targetPeerKey = this.getTargetPeerKey();
        final Object other$targetPeerKey = other.getTargetPeerKey();
        if (this$targetPeerKey == null ? other$targetPeerKey != null : !this$targetPeerKey.equals(other$targetPeerKey)) return false;
        final Object this$options = this.getOptions();
        final Object other$options = other.getOptions();
        if (this$options == null ? other$options != null : !this$options.equals(other$options)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientVoiceOptionsPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $targetPeerKey = this.getTargetPeerKey();
        result = result * PRIME + ($targetPeerKey == null ? 43 : $targetPeerKey.hashCode());
        final Object $options = this.getOptions();
        result = result * PRIME + ($options == null ? 43 : $options.hashCode());
        return result;
    }

    public ClientVoiceOptionsPayload(final String targetPeerKey, final VoicePeerOptions options) {
        this.targetPeerKey = targetPeerKey;
        this.options = options;
    }
}
