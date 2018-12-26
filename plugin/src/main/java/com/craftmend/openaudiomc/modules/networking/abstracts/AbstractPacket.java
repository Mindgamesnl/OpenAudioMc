package com.craftmend.openaudiomc.modules.networking.abstracts;


import com.craftmend.openaudiomc.modules.networking.enums.PacketType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public abstract class AbstractPacket {

    private PacketType packetType;

}
