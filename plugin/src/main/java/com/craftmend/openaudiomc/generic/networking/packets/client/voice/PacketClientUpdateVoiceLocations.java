package com.craftmend.openaudiomc.generic.networking.packets.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceUpdatePeerLocationsPayload;

public class PacketClientUpdateVoiceLocations extends AbstractPacket {

    public PacketClientUpdateVoiceLocations(ClientVoiceUpdatePeerLocationsPayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_VOICE_UPDATE_PEER_LOCATIONS,
                null
        );
    }

}
