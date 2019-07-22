package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientConnectionPayload;

public class PacketClientConnect extends AbstractPacket {
    public PacketClientConnect(ClientConnectionPayload data) {
        super(data, PacketChannel.SOCKET_IN_REGISTER_CLIENT, null);
    }
}
