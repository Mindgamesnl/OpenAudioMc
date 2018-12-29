package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.modules.networking.payloads.AcknowledgeClientPayload;

public class PacketAcknowledgeClientRequest extends AbstractPacket {

    public PacketAcknowledgeClientRequest(AcknowledgeClientPayload data) {
        super(data, PacketChannel.SOCKET_OUT_AWKNOLEGECLIENT, null);
    }

}
