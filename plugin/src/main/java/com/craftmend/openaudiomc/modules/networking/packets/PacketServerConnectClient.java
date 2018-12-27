package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketType;
import lombok.Getter;

public class PacketServerConnectClient extends AbstractPacket {

    @Getter private String client;

    public PacketServerConnectClient() {
        super(PacketType.SERVER_CLIENT_WEB_CONNECT);
        setData(this);
    }

}
