package com.craftmend.openaudiomc.generic.networking.packets.client.voice.channels;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.channels.ClientChannelStatusPayload;

public class PacketClientChannelStatusPacket extends AbstractPacket {

    public PacketClientChannelStatusPacket(String channel) {
        super(
                new ClientChannelStatusPayload(channel),
                PacketChannel.CLIENT_OUT_CHANNEL_STATUS,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
