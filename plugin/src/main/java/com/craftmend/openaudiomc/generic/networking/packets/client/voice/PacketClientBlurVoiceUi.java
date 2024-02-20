package com.craftmend.openaudiomc.generic.networking.packets.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceBlurUiPayload;

public class PacketClientBlurVoiceUi extends AbstractPacket {

    public PacketClientBlurVoiceUi(ClientVoiceBlurUiPayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_VOICE_BLUR,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
