package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketChannel;

public class PacketSocketKickClient extends AbstractPacket {

    public PacketSocketKickClient() {
        super(null, PacketChannel.SOCKET_OUT_KICK_CLIENT, null);
    }

}
