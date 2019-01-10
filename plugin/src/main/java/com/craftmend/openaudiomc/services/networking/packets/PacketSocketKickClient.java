package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;

public class PacketSocketKickClient extends AbstractPacket {

    public PacketSocketKickClient() {
        super(null, PacketChannel.SOCKET_OUT_KICK_CLIENT, null);
    }

}
