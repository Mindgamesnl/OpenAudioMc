package com.craftmend.openaudiomc.generic.networking.packets.client.speakers;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.ClientSpeakerCreatePayload;

public class PacketClientCreateSpeaker extends AbstractPacket {

    public PacketClientCreateSpeaker(ClientSpeakerCreatePayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_SPEAKER_CREATE,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
