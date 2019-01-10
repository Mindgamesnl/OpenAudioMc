package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.payloads.ClientDisconnectPayload;

public class PacketClientDisconnect extends AbstractPacket {
    public PacketClientDisconnect(ClientDisconnectPayload data) {
        super(data, PacketChannel.SOCKET_IN_UNREGISTER_CLIENT, null);
    }
}
