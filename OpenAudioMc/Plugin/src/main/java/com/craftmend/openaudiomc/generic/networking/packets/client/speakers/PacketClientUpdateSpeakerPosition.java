package com.craftmend.openaudiomc.generic.networking.packets.client.speakers;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.ClientPlayerLocationPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.ClientSpeakerPositionUpdatePayload;

public class PacketClientUpdateSpeakerPosition extends AbstractPacket {

    public PacketClientUpdateSpeakerPosition(ClientSpeakerPositionUpdatePayload locationPayload) {
        super(
                locationPayload,
                PacketChannel.CLIENT_OUT_SPEAKER_POSITION,
                null
        );
    }

}
