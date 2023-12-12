package com.craftmend.openaudiomc.generic.networking.packets.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceChatToggleDeafenPayload;

public class PacketClientToggleDeafen extends AbstractPacket {

    public PacketClientToggleDeafen() {
        super(
                new ClientVoiceChatToggleDeafenPayload(),
                PacketChannel.CLIENT_OUT_TOGGLE_DEAFEN,
                null
        );
    }

}
