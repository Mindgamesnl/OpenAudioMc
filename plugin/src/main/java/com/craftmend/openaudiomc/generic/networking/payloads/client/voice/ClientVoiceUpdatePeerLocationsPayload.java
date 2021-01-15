package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientRtcLocationUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class ClientVoiceUpdatePeerLocationsPayload extends AbstractPacketPayload {

    private Set<ClientRtcLocationUpdate> updateSet;

}
