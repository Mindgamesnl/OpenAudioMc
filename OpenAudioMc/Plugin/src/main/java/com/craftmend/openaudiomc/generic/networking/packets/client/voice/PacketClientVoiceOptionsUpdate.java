package com.craftmend.openaudiomc.generic.networking.packets.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceOptionsPayload;

public class PacketClientVoiceOptionsUpdate extends AbstractPacket {

    public PacketClientVoiceOptionsUpdate(ClientVoiceOptionsPayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_PEER_OPTIONS,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
