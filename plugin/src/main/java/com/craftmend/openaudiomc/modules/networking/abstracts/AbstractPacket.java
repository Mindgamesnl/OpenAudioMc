package com.craftmend.openaudiomc.modules.networking.abstracts;


import com.craftmend.openaudiomc.modules.networking.enums.PacketType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public abstract class AbstractPacket {

    @Getter private PacketType packetType;
    private AbstractPacket data;

    public AbstractPacket(PacketType packetType) {
        this.packetType = packetType;
    }

    protected void setData(AbstractPacket abstractPacket) {
        if (data == null) data = abstractPacket;
    }

}
