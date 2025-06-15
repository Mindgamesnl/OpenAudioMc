package com.craftmend.openaudiomc.generic.networking.packets.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceChatUnlockPayload;

public class PacketClientUnlockVoiceChat extends AbstractPacket {

    public PacketClientUnlockVoiceChat(ClientVoiceChatUnlockPayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_VOICE_UNLOCK,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
