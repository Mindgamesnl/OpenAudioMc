package com.craftmend.openaudiomc.generic.networking.abstracts;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class AbstractPacket {

    /**
     * AbstractPacket
     *
     * Used by the openaudiomc packet lib
     */
    private AbstractPacketPayload data;
    private PacketChannel packetChannel;
    @Setter private UUID client;

    public AbstractPacket(AbstractPacketPayload data, PacketChannel packetChannel, UUID client) {
        this.data = data;
        this.packetChannel = packetChannel;
        this.client = client;
    }

    protected transient boolean queueableIfReconnecting = false;

}
