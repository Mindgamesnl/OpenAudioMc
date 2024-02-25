package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;

public class PacketSocketKickClient extends AbstractPacket {

    public PacketSocketKickClient() {
        super(null, PacketChannel.SOCKET_OUT_KICK_CLIENT, null);
        this.queueableIfReconnecting = true;
    }

}
