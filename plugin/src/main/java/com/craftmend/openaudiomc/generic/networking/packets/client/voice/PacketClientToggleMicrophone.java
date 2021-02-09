package com.craftmend.openaudiomc.generic.networking.packets.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceChatToggleMicrophonePayload;

public class PacketClientToggleMicrophone extends AbstractPacket {

    public PacketClientToggleMicrophone(ClientVoiceChatToggleMicrophonePayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_TOGGLE_MIC,
                null
        );
    }

}
