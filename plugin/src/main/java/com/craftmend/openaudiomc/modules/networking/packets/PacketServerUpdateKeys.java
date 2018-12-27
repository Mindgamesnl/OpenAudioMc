package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketType;
import lombok.Getter;

public class PacketServerUpdateKeys extends AbstractPacket {

    @Getter private String publicKey;
    @Getter private String privateKey;

    public PacketServerUpdateKeys() {
        super(PacketType.SERVER_UPDATE_TOKENS);

        setData(this);
    }

}
