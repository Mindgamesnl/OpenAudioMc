package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientDisconnectPayload;

public class PacketClientDisconnect extends AbstractPacket {
    public PacketClientDisconnect(ClientDisconnectPayload data) {
        super(data, PacketChannel.SOCKET_IN_UNREGISTER_CLIENT, null);
    }
}
