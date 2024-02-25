package com.craftmend.openaudiomc.generic.networking.packets.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceSubscribePayload;

public class PacketClientSubscribeToVoice extends AbstractPacket {

    public PacketClientSubscribeToVoice(ClientVoiceSubscribePayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_VOICE_SUBSCRIBE,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
