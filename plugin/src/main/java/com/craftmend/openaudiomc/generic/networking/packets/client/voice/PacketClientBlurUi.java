package com.craftmend.openaudiomc.generic.networking.packets.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceBlurUiPayload;

public class PacketClientBlurUi extends AbstractPacket {

    public PacketClientBlurUi(ClientVoiceBlurUiPayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_VOICE_BLUR,
                null
        );
    }

}
