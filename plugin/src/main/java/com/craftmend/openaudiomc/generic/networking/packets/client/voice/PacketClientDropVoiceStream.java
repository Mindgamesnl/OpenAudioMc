package com.craftmend.openaudiomc.generic.networking.packets.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;

public class PacketClientDropVoiceStream extends AbstractPacket {

    public PacketClientDropVoiceStream(ClientVoiceDropPayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_VOICE_DROP_STREAM,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
