package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.payloads.ClientConnectionPayload;

public class PacketClientConnect extends AbstractPacket {
    public PacketClientConnect(ClientConnectionPayload data) {
        super(data, PacketChannel.SOCKET_IN_REGISTER_CLIENT);
    }
}
