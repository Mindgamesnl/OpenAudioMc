package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.payloads.ClientConnectionPayload;

public class PacketClientConnect extends AbstractPacket {
    public PacketClientConnect(ClientConnectionPayload data) {
        super(data, PacketChannel.SOCKET_IN_REGISTER_CLIENT, null);
    }
}
