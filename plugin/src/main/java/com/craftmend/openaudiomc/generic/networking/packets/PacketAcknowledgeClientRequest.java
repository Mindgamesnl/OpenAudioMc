package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.AcknowledgeClientPayload;

public class PacketAcknowledgeClientRequest extends AbstractPacket {

    public PacketAcknowledgeClientRequest(AcknowledgeClientPayload data) {
        super(data, PacketChannel.SOCKET_OUT_ACKNOWLEDGEMENT, null);
        this.queueableIfReconnecting = true;
    }

}
