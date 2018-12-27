package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketType;
import lombok.Getter;

public class PacketServerDisconnectClient extends AbstractPacket {

    @Getter private String client;

    public PacketServerDisconnectClient() {
        super(PacketType.SERVER_CLIENT_WEB_DISCONNECT);
        setData(this);
    }

}
