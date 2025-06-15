package com.craftmend.openaudiomc.generic.networking.packets.client.ui;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.ui.ClientModerationStatusPayload;

public class PacketClientModerationStatus extends AbstractPacket {

    public PacketClientModerationStatus(boolean isModerating) {
        super(
                new ClientModerationStatusPayload(isModerating),
                PacketChannel.CLIENT_OUT_MODERATION_STATUS,
                null
        );
        this.queueableIfReconnecting = true;
    }

}
