package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketType;
import lombok.Getter;

public class PacketServerUpdatePublicKey extends AbstractPacket {

    @Getter private String key;

    public PacketServerUpdatePublicKey() {
        super(PacketType.SERVER_UPDATE_PUBLIC_TOKEN);

        setData(this);
    }

}
