package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.client.helpers.ClientRtcLocationUpdate;
import java.util.Set;

public class ClientVoiceUpdatePeerLocationsPayload extends AbstractPacketPayload {
    private Set<ClientRtcLocationUpdate> updateSet;

    public Set<ClientRtcLocationUpdate> getUpdateSet() {
        return this.updateSet;
    }

    public void setUpdateSet(final Set<ClientRtcLocationUpdate> updateSet) {
        this.updateSet = updateSet;
    }

    @Override
    public String toString() {
        return "ClientVoiceUpdatePeerLocationsPayload(updateSet=" + this.getUpdateSet() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientVoiceUpdatePeerLocationsPayload)) return false;
        final ClientVoiceUpdatePeerLocationsPayload other = (ClientVoiceUpdatePeerLocationsPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$updateSet = this.getUpdateSet();
        final Object other$updateSet = other.getUpdateSet();
        if (this$updateSet == null ? other$updateSet != null : !this$updateSet.equals(other$updateSet)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientVoiceUpdatePeerLocationsPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $updateSet = this.getUpdateSet();
        result = result * PRIME + ($updateSet == null ? 43 : $updateSet.hashCode());
        return result;
    }

    public ClientVoiceUpdatePeerLocationsPayload(final Set<ClientRtcLocationUpdate> updateSet) {
        this.updateSet = updateSet;
    }
}
