package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientVoiceDropPayload extends AbstractPacketPayload {
    private boolean dropAll = false;
    private String[] keysToDrop;

    private ClientVoiceDropPayload(boolean dropAll) {
        this.dropAll = dropAll;
    }

    public ClientVoiceDropPayload(String[] keysToDrop) {
        this.keysToDrop = keysToDrop;
    }

    public static ClientVoiceDropPayload dropAll() {
        return new ClientVoiceDropPayload(true);
    }

    public boolean isDropAll() {
        return this.dropAll;
    }

    public String[] getKeysToDrop() {
        return this.keysToDrop;
    }

    public void setDropAll(final boolean dropAll) {
        this.dropAll = dropAll;
    }

    public void setKeysToDrop(final String[] keysToDrop) {
        this.keysToDrop = keysToDrop;
    }

    @Override
    public String toString() {
        return "ClientVoiceDropPayload(dropAll=" + this.isDropAll() + ", keysToDrop=" + java.util.Arrays.deepToString(this.getKeysToDrop()) + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientVoiceDropPayload)) return false;
        final ClientVoiceDropPayload other = (ClientVoiceDropPayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isDropAll() != other.isDropAll()) return false;
        if (!java.util.Arrays.deepEquals(this.getKeysToDrop(), other.getKeysToDrop())) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientVoiceDropPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isDropAll() ? 79 : 97);
        result = result * PRIME + java.util.Arrays.deepHashCode(this.getKeysToDrop());
        return result;
    }
}
