package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.client.helpers.ClientRtcLocationUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
public class ClientVoiceUpdatePeerLocationsPayload extends AbstractPacketPayload {

    private Set<ClientRtcLocationUpdate> updateSet;

}
