package com.craftmend.openaudiomc.generic.networking.packets.client.voice.channels;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.channels.ClientChannelsDisplayPayload;

public class PacketClientChannelsDisplayPacket extends AbstractPacket {

    public PacketClientChannelsDisplayPacket(ClientChannelsDisplayPayload payload) {
        super(
                payload,
                PacketChannel.CLIENT_OUT_CHANNEL_LIST_PATCH,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
