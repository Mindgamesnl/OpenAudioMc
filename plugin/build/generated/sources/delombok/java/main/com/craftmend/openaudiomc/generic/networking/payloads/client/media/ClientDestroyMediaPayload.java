package com.craftmend.openaudiomc.generic.networking.payloads.client.media;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;

public class ClientDestroyMediaPayload extends AbstractPacketPayload {
    private String soundId;
    private boolean all = false;
    private int fadeTime = PacketClientDestroyMedia.DEFAULT_FADE_TIME;

    public String getSoundId() {
        return this.soundId;
    }

    public boolean isAll() {
        return this.all;
    }

    public int getFadeTime() {
        return this.fadeTime;
    }

    public void setSoundId(final String soundId) {
        this.soundId = soundId;
    }

    public void setAll(final boolean all) {
        this.all = all;
    }

    public void setFadeTime(final int fadeTime) {
        this.fadeTime = fadeTime;
    }

    @Override
    public String toString() {
        return "ClientDestroyMediaPayload(soundId=" + this.getSoundId() + ", all=" + this.isAll() + ", fadeTime=" + this.getFadeTime() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientDestroyMediaPayload)) return false;
        final ClientDestroyMediaPayload other = (ClientDestroyMediaPayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isAll() != other.isAll()) return false;
        if (this.getFadeTime() != other.getFadeTime()) return false;
        final Object this$soundId = this.getSoundId();
        final Object other$soundId = other.getSoundId();
        if (this$soundId == null ? other$soundId != null : !this$soundId.equals(other$soundId)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientDestroyMediaPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isAll() ? 79 : 97);
        result = result * PRIME + this.getFadeTime();
        final Object $soundId = this.getSoundId();
        result = result * PRIME + ($soundId == null ? 43 : $soundId.hashCode());
        return result;
    }

    public ClientDestroyMediaPayload() {
    }

    public ClientDestroyMediaPayload(final String soundId, final boolean all, final int fadeTime) {
        this.soundId = soundId;
        this.all = all;
        this.fadeTime = fadeTime;
    }
}
