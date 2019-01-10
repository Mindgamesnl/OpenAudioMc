package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.payloads.AcknowledgeClientPayload;

public class PacketAcknowledgeClientRequest extends AbstractPacket {

    public PacketAcknowledgeClientRequest(AcknowledgeClientPayload data) {
        super(data, PacketChannel.SOCKET_OUT_ACKNOWLEDGEMENT, null);
    }

}
