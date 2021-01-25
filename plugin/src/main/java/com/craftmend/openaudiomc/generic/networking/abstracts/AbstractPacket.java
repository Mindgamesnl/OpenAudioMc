package com.craftmend.openaudiomc.generic.networking.abstracts;

import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AbstractPacket {

    /**
     * AbstractPacket
     *
     * Used by the openaudiomc packet lib
     */
    private AbstractPacketPayload data;
    private PacketChannel packetChannel;
    @Setter private UUID client;

}
