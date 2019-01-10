package com.craftmend.openaudiomc.services.networking.abstracts;

import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AbstractPacket {

    private AbstractPacketPayload data;
    private PacketChannel packetChannel;
    @Setter private UUID client;

}
