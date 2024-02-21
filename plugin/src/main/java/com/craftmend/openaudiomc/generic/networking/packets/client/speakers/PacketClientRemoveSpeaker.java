package com.craftmend.openaudiomc.generic.networking.packets.client.speakers;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.ClientSpeakerDestroyPayload;

public class PacketClientRemoveSpeaker extends AbstractPacket {

    public PacketClientRemoveSpeaker(ClientSpeakerDestroyPayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_SPEAKER_DESTROY,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
