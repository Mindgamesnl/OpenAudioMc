package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.modules.networking.payloads.ClientDisconnectPayload;

public class PacketClientDisconnect extends AbstractPacket {
    public PacketClientDisconnect(ClientDisconnectPayload data) {
        super(data, PacketChannel.SOCKET_IN_UNREGISTER_CLIENT, null);
    }
}
