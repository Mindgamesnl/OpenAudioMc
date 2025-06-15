package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientVoiceBlurUiPayload extends AbstractPacketPayload {
    private boolean blurred;

    public boolean isBlurred() {
        return this.blurred;
    }

    public void setBlurred(final boolean blurred) {
        this.blurred = blurred;
    }

    @Override
    public String toString() {
        return "ClientVoiceBlurUiPayload(blurred=" + this.isBlurred() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientVoiceBlurUiPayload)) return false;
        final ClientVoiceBlurUiPayload other = (ClientVoiceBlurUiPayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isBlurred() != other.isBlurred()) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientVoiceBlurUiPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isBlurred() ? 79 : 97);
        return result;
    }

    public ClientVoiceBlurUiPayload(final boolean blurred) {
        this.blurred = blurred;
    }
}
